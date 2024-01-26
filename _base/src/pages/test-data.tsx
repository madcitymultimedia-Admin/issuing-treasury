import { Box, Container, Grid } from "@mui/material";
import { GetServerSidePropsContext } from "next";
import React, { ReactNode } from "react";

import DashboardLayout from "src/layouts/dashboard/layout";
import TestDataCreatePaymentLink from "src/sections/test-data/test-data-create-payment-link";
import TestDataCreatePayouts from "src/sections/test-data/test-data-create-payout";
import TestDataCreatePayoutsToBank from "src/sections/test-data/test-data-create-payout-to-bank";
import FinancialProduct from "src/types/financial_product";
import { getSessionForServerSideProps } from "src/utils/session-helpers";
import stripeClient from "src/utils/stripe-loader";

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const session = await getSessionForServerSideProps(context);
  const { stripeAccount, financialProduct } = session;
  const { accountId, platform } = stripeAccount;
  const stripe = stripeClient(platform);
  const responseAccount = await stripe.accounts.retrieve(accountId);

  const hasExternalAccount =
    responseAccount.external_accounts?.data[0] != undefined;

  const responseBalance = await stripe.balance.retrieve({
    stripeAccount: accountId,
  });

  const availableBalance = responseBalance.available[0].amount;
  const currency = responseBalance.available[0].currency;

  return {
    props: { hasExternalAccount, availableBalance, currency, financialProduct },
  };
};

const Page = ({
  hasExternalAccount,
  availableBalance,
  currency,
  financialProduct,
}: {
  hasExternalAccount: boolean;
  availableBalance: number;
  currency: string;
  financialProduct: FinancialProduct;
}) => {
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} sm={10} md={8}>
              <TestDataCreatePaymentLink />
            </Grid>
            <Grid item xs={12} sm={10} md={8}>
              {financialProduct == FinancialProduct.EmbeddedFinance ? (
                <TestDataCreatePayouts
                  hasExternalAccount={hasExternalAccount}
                  availableBalance={availableBalance}
                  currency={currency}
                />
              ) : (
                <TestDataCreatePayoutsToBank
                  hasExternalAccount={hasExternalAccount}
                  availableBalance={availableBalance}
                  currency={currency}
                />
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page: ReactNode) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;