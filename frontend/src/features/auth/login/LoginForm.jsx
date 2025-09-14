import styled from "styled-components";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { validation } from "./schema/validation";

import InputField from "@components/InputField";
import Button from "@components/Button";
import SpinnerMini from "@components/SpinnerMini";

import { useLogin } from "./hooks/useLogin";
import Form from "../Form";
import { translator as t } from "@data/translations/ar";
import CallToAction from "@features/CallToAction";

const Container = styled.div`
  background-color: #f5f6fa;
`;

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validation),
    mode: "onTouched",
  });

  const { login, isPending } = useLogin();

  async function onSubmit(data) {
    login(data);
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <div>
          <InputField
            label={t.user.email}
            placeholder={t.auth.enterEmail}
            defaultValue="test@gmail.com"
            error={errors?.email?.message}
            type="email"
            id="email"
            register={register}
          />
          <InputField
            label={t.user.password}
            placeholder={t.auth.enterPassword}
            defaultValue="1234"
            register={register}
            error={errors?.password?.message}
            type="password"
            id="password"
          />
        </div>
        <div>
          <Button
            $variation="primary"
            type="submit"
            disabled={isSubmitting || isPending}
          >
            {isSubmitting || isPending ? <SpinnerMini /> : t.auth.login}
          </Button>
          <p>
            {t.auth.noAccount}{" "}
            <CallToAction to="/signup">{t.auth.signUp}</CallToAction>
          </p>
        </div>
      </Form>
    </Container>
  );
}

export default LoginForm;
