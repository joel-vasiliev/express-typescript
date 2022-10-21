import * as yup from "yup";
import "yup-phone";

export const Price = yup.object({
  price: yup
    .number()
    .required("Por favor, digite pelo menos um valor para o seu produto"),
  minimum: yup
    .number()
    .required(
      "Por favor, digite uma quantidade mínima para o seu produto (também pode ser 0)"
    ),
});

export const ProductValidate = yup.object({
  body: yup.object({
    header: yup
      .string()
      .max(200, "O campo de cabeçalho deve ter no máximo 200 caracteres.")
      .min(2, "O campo de cabeçalho deve ter no mínimo 2 caracteres.")
      .required("Por favor, preencha o campo com o cabeçalho da mensagem."),
    title: yup
      .string()
      .max(100, "O campo de título deve ter no máximo 100 caracteres.")
      .min(2, "O campo de título deve ter no mínimo 2 caracteres.")
      .required("Por favor, preencha o campo com o título da mensagem."),
    category: yup
      .string()
      .max(100, "O campo de categoria deve ter no máximo 100 caracteres")
      .min(2, "O campo de categoria deve ter no mínimo 2 caracteres.")
      .required("O campo categoria é obrigatório!"),
    goal: yup.object({
      requiredAmount: yup
        .number()
        .max(20, "O campo quantidade mínima deve ter no máximo 20 caracteres.")
        .required("Por favor, preencha o campo quantidade mínima."),
    }),
    prices: yup
      .array(Price)
      .required(
        "Por favor, digite as informações sobre o preço do seu produto"
      ),
  }),
});

export const CreateParticipantValidate = yup.object({
  body: yup.object({
    userId: yup.number().required("Por favor, preencha o campo userId"),
    amount: yup.number().required("Por favor, preencha o campo amount"),
  }),
});
