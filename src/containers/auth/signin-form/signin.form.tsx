import { AuthSignin, useSignin } from "@/apis/auth";
import { FormField, Logo } from "@/components";
import { PageRoutes } from "@/constants";
import { useSafePush } from "@/hooks";
import { toUrl } from "@/utils";
import { Box, Button, Card } from "@chakra-ui/react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

const SigninForm = () => {
  const { push } = useSafePush();
  const [searchParams] = useSearchParams();
  const { control, handleSubmit } = useForm<AuthSignin>();
  const { mutate: signin, isLoading, isSuccess } = useSignin();
  const { t } = useTranslation();

  return (
    <Card direction={"column"} gap={"4"} p={"8"}>
      <Logo
        onClick={() =>
          push({
            pathname: toUrl(PageRoutes.Home),
          })
        }
      />
      <Box
        as={"form"}
        display={"flex"}
        flexDirection={"column"}
        gap={"4"}
        onSubmit={handleSubmit(
          useCallback(
            (data) =>
              signin(data, {
                onSuccess: () => {
                  push({
                    pathname:
                      searchParams.get("redirect") ?? toUrl(PageRoutes.Home),
                  });
                },
              }),
            [push, searchParams, signin]
          )
        )}
      >
        <FormField
          label={t("Email")}
          fieldType={"string"}
          control={control}
          name={"email"}
        />
        <Button
          type={"submit"}
          isLoading={isLoading || isSuccess}
          isDisabled={isLoading || isSuccess}
        >
          {t("Sign In")}
        </Button>
      </Box>
    </Card>
  );
};

export default SigninForm;
