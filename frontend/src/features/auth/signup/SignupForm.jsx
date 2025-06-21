import { NavLink } from "react-router-dom";
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

const Container = styled.div`
  background-color: #f5f6fa;
`;

const Names = styled.div`
  display: flex;
  justify-content: space-around;
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
                            return "Your passwords do not match";
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
          <Button type="submit" disabled={isSubmitting || isPending}>
            {isSubmitting || isPending ? <SpinnerMini /> : "Signup"}
          </Button>
          <p>
            Already have an account? <NavLink to="/login">Login</NavLink>
          </p>
        </div>
      </Form>
    </Container>
  );
}

export default SignupForm;
