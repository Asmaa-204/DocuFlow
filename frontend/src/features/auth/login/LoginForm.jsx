import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { validation } from "./schema/validation";

import InputField from "@components/InputField";
import Button from "@components/Button";
import SpinnerMini from "@components/SpinnerMini";

import { useLogin } from "./hooks/useLogin";
import Form from "../Form";

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
            label="Email"
            placeholder="Enter your email"
            defaultValue="test1@gmail.com"
            error={errors?.email?.message}
            type="email"
            id="email"
            register={register}
          />
          <InputField
            label="Password"
            placeholder="Enter your password"
            defaultValue="12345"
            register={register}
            error={errors?.password?.message}
            type="password"
            id="password"
          />
        </div>
        <div>
          <Button type="submit" disabled={isSubmitting || isPending}>
            {isSubmitting || isPending ? <SpinnerMini /> : "Login"}
          </Button>
          <p>
            Don't have an account? <NavLink to="/signup">Sign up</NavLink>
          </p>
        </div>
      </Form>
    </Container>
  );
}

export default LoginForm;
