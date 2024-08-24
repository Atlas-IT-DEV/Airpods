import { useState } from "react";
import { useNavigate } from "react-router";
import useWindowDimensions from "../components/GetDimensions";
import { FormControl } from "@chakra-ui/react";
import PhoneInput from "react-phone-input-2";
import "swiper/css";
import "swiper/css/free-mode";
import { Formik, Form, Field } from "formik";
import { useEffect } from "react";
import * as yup from "yup";

function OformitPage() {
  const { width } = useWindowDimensions();
  const [block, setBlock] = useState("cdek");
  const [number, setNumber] = useState("");

  const FormSchema = yup.object().shape({
    last_name: yup.string().required("Обязательное поле"),
    first_name: yup.string().required("Обязательное поле"),
    phone: yup
      .string()
      .matches(/(\+?[\d-\(][\d-\)\s]{6,}\d$)/, "Неверный номер телефона"),
    adress: yup.string().required("Обязательное поле"),
  });

  const handle_submit = (values) => {
    let last_name = values.last_name;
    let first_name = values.first_name;
    let phone = number;
    let index = values.index;
    let name = values.adress;
    let result = "";
    let a = "";
    for (let i = 0; i < window.GlobalProductColors.length; i++) {
      a += `название ${window.GlobalCartNames[i]}  цвета ${window.GlobalProductColors[i]} \n`;
    }
    result =
      window.GlobalPost === "почта России" ||
      window.GlobalPost === "почта по миру"
        ? `Здравствуйте , хочу сделать заказ! 
    Мои данные для заказа:
    ФИО: ${first_name} ${last_name}
    ТЕЛЕФОН: ${phone}
    АДРЕС: ${name}
    ДОСТАВКА: ${window.GlobalPost}
    ИНДЕКС: ${index}
    СУММА: ${window.GlobalSum} ₽
    ТОВАРЫ: 
    ${a}

    Жду от вас обратной связи`
        : `Здравствуйте , хочу сделать заказ! 
    Мои данные для заказа:
    ФИО: ${first_name} ${last_name}
    ТЕЛЕФОН: ${phone}
    АДРЕС: ${name}
    ДОСТАВКА: ${window.GlobalPost}
    СУММА: ${window.GlobalSum} ₽
    ТОВАРЫ: 
    ${a}

    Жду от вас обратной связи`;
    window.GlobalDetails = result;
    console.log(result);
    navigate("/copy");
  };

  const tg = window.Telegram.WebApp;
  const backButton = tg.BackButton;
  const navigate = useNavigate();
  function back_page() {
    navigate("/cart");
  }

  backButton.show();
  backButton.onClick(back_page);

  const initialValues =
    window.GlobalPost === "почта России" ||
    window.GlobalPost === "почта по миру"
      ? {
          last_name: "",
          first_name: "",
          phone: "",
          pochta: "сдэк (СДЭК)",
          index: "",
          adress: "",
        }
      : {
          last_name: "",
          first_name: "",
          phone: "",
          pochta: "сдэк (СДЭК)",
          adress: "",
        };
  useEffect(() => {
    if (width <= 410) setBlock("cdek_small");
    else setBlock("cdek");
  });

  return (
    <div id="oformit_main">
      <p id="oformit_header">Оформление заказа</p>
      <div id="oformit_form_div">
        <Formik
          initialValues={initialValues}
          validationSchema={FormSchema}
          onSubmit={handle_submit}
          key="trade-form"
        >
          {(formik) => (
            <Form>
              <Field name="last_name">
                {({ field, form }) => (
                  <FormControl
                    isRequired
                    isInvalid={
                      !!form.values.last_name && !!form.errors.last_name
                    }
                  >
                    <input
                      {...field}
                      placeholder="Фамилия"
                      className="gray_input"
                      type="text"
                      id="last_name"
                      w="100%"
                    />
                    {form.errors.last_name && (
                      <label style={{ color: "red" }}>
                        {form.errors.last_name}
                      </label>
                    )}
                  </FormControl>
                )}
              </Field>
              <Field name="first_name">
                {({ field, form }) => (
                  <FormControl
                    isRequired
                    isInvalid={
                      !!form.values.first_name && !!form.errors.first_name
                    }
                  >
                    <input
                      {...field}
                      placeholder="Имя"
                      className="gray_input"
                      type="text"
                      id="first_name"
                      w="100%"
                    />
                    {form.errors.first_name && (
                      <label style={{ color: "red" }}>
                        {form.errors.first_name}
                      </label>
                    )}
                  </FormControl>
                )}
              </Field>
              <Field name="phone">
                {({ field, form }) => (
                  <FormControl
                    isRequired
                    isInvalid={!!form.values.phone && !!form.errors.phone}
                  >
                    <PhoneInput
                      country="ru"
                      {...field}
                      inputStyle={{
                        color: "white",
                        backgroundColor: "transparent",
                        width: "90%",
                        height: "40px",
                      }}
                      dropdownStyle={{
                        color: "gray",
                        backgroundColor: "#1a1a1a",
                        colorScheme: "dark",
                      }}
                      buttonStyle={{
                        backgroundColor: "transparent",
                      }}
                      value={number}
                      onChange={(event) => setNumber(event)}
                      placeholder="Номер телефона"
                      className="gray_input"
                      style={{ padding: "5px 0px" }}
                      type="number"
                      id="phone"
                    />
                    {form.errors.phone && (
                      <label style={{ color: "red" }}>
                        {form.errors.phone}
                      </label>
                    )}
                  </FormControl>
                )}
              </Field>
              {window.GlobalPost === "сдэк" ? (
                <p style={{ padding: "0px", marginTop: "15px" }}>
                  Выберите пункт выдачи Сдек
                </p>
              ) : window.GlobalPost === "почта России" ? (
                <p style={{ padding: "0px", marginTop: "15px" }}>
                  Введите ваш адрес и индекс
                </p>
              ) : (
                <p style={{ padding: "0px", marginTop: "15px" }}>
                  Введите полный адрес с индексом, ЗАПОЛНЯТЬ ЛАТИНИЦЕЙ
                </p>
              )}
              {(window.GlobalPost === "почта по миру" ||
                window.GlobalPost === "почта России") && (
                <Field name="index">
                  {({ field, form }) => (
                    <FormControl
                      isRequired
                      isInvalid={!!form.values.index && !!form.errors.index}
                      maxH="350px"
                    >
                      <input
                        {...field}
                        placeholder="Введите индекс"
                        className="gray_input"
                        type="text"
                        id="index"
                        w="100%"
                      />
                      {form.errors.index && (
                        <label style={{ color: "red" }}>
                          {form.errors.index}
                        </label>
                      )}
                    </FormControl>
                  )}
                </Field>
              )}

              <Field name="adress">
                {({ field, form }) => (
                  <FormControl
                    isRequired
                    isInvalid={!!form.values.adress && !!form.errors.adress}
                    maxH="350px"
                  >
                    <input
                      {...field}
                      placeholder="Введите адрес"
                      className="gray_input"
                      type="text"
                      id="adress"
                      w="100%"
                    />
                    {form.errors.adress && (
                      <label style={{ color: "red" }}>
                        {form.errors.adress}
                      </label>
                    )}
                  </FormControl>
                )}
              </Field>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10px",
                }}
              >
                <button
                  className="gold_button"
                  type="submit"
                  disabled={
                    !formik.values.last_name ||
                    !formik.values.first_name ||
                    !number ||
                    !formik.values.adress ||
                    !!formik.errors.last_name ||
                    !!formik.errors.first_name ||
                    !!formik.errors.adress
                  }
                  style={{ width: "100%" }}
                >
                  Оформить заказ
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div>
        <p id="caution">ОПЛАТА ЗАКАЗА ПРОИСХОДИТ ТОЛЬКО У МЕНЕДЖЕРА</p>
      </div>
    </div>
  );
}
export default OformitPage;
