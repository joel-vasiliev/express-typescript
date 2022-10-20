// import * as yup from "yup";
// import "yup-phone";

// const UserValidate = yup.object({
//   body: yup.object({
//     name: yup.string().trim().required("Por favor, preencha o campo nome."),
//     document: yup
//       .string()
//       .max(11, "O campo de documento deve ter 11 caracteres.")
//       .min(11, "O campo de documento deve ter 11 caracteres.")
//       .required("Por favor, preencha o campo de documento."),
//     phone: yup
//       .string()
//       .max(11, "O campo de telefone deve ter 11 caracteres.")
//       .matches(/^\d+$/, "O campo telefone deve conter apenas dígitos.")
//       .required("Por favor, preencha o campo telefone."),
//     email: yup
//       .string()
//       .email("Por favor, insira um email válido.")
//       .required("Por favor, preencha o campo de email."),
//     password: yup
//       .string()
//       .max(20, "O campo senha deve ter no máximo 20 caracteres.")
//       .min(12, "O campo senha deve ter no mínimo 12 caracteres.")
//       .required("Por favor, preencha o campo senha."),
//     confirmPassword: yup
//       .string()
//       .oneOf([yup.ref("password"), null], "As senhas devem ser iguais."),
//   }),
// });

// export default UserValidate;
