import styled from "styled-components";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import InputField from "@components/InputField.jsx";
import Button from "@components/Button";
import SpinnerMini from "@components/SpinnerMini";

import { inputsData } from "./inputsData.js";
import { useSignup } from "./hooks/useSignup.jsx";
import Form from "../Form.jsx";
import { validation } from "./schema/validation.js";
import { translator as t } from "@data/translations/ar";
import CallToAction from "@features/CallToAction.jsx";

const Container = styled.div`
  background-color: #f5f6fa;
`;

const Names = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  width: 100%;
  flex-wrap: wrap;

  & > div {
    flex: 1;
    max-width: 48%;
    box-sizing: border-box;
  }
`;

function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({
    resolver: yupResolver(validation),
    mode: "onTouched",
  });

  const { signup, isPending } = useSignup(watch("password"));

  async function onSubmit(data) {
    const { confirmPassword, ...rest } = data;
    signup(rest);
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <div>
          <Names>
            {inputsData.map((input) => {
              if (input.id === "firstName" || input.id === "lastName") {
                return (
                  <div key={input.id}>
                    <InputField
                      id={input.id}
                      type={input.type}
                      label={input.label}
                      register={register}
                      error={errors[input.id]?.message}
                      placeholder={input.placeholder}
                    />
                  </div>
                );
              }
              return null;
            })}
          </Names>
          {inputsData.map((input) => {
            if (input.id !== "firstName" && input.id !== "lastName") {
              return (
                <InputField
                  id={input.id}
                  key={input.id}
                  type={input.type}
                  label={input.label}
                  register={register}
                  error={errors[input.id]?.message}
                  options={input.options}
                  placeholder={input.placeholder}
                  min={input.id === "age" ? 1 : undefined}
                  validate={
                    input.id === "confirmPassword"
                      ? (val) => {
                          if (watch("password") !== val) {
                            return t.validation.passwordsMismatch;
                          }
                        }
                      : undefined
                  }
                />
              );
            }
          })}
        </div>
        <div>
          <Button
            $variation="primary"
            type="submit"
            disabled={isSubmitting || isPending}
          >
            {isSubmitting || isPending ? <SpinnerMini /> : t.auth.signUp}
          </Button>
          <p>
            {t.auth.haveAccount}{" "}
            <CallToAction to="/login">{t.auth.login}</CallToAction>
          </p>
        </div>
      </Form>
    </Container>
  );
}

export default SignupForm;
