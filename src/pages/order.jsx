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
import { useStores } from "../store/store_context";
import { observer } from "mobx-react-lite";

const OformitPage = observer(() => {
  const { width } = useWindowDimensions();
  const [number, setNumber] = useState("");
  const { pageStore } = useStores();
  const FormSchema = yup.object().shape({
    last_name: yup.string().required("Обязательное поле"),
    first_name: yup.string().required("Обязательное поле"),
    phone: yup
      .string()
      .matches(/(\+?[\d-\(][\d-\)\s]{6,}\d$)/, "Неверный номер телефона"),
    adress: yup.string().required("Обязательное поле"),
  });
  function aggregateItemsByIdAndColor(items) {
    const result = [];

    items.forEach((item) => {
      // Проверяем, есть ли уже объект с таким же id и color в результате
      const existingItem = result.find(
        (resItem) => resItem.id === item.id && resItem.color === item.color
      );

      if (existingItem) {
        // Если объект найден, добавляем к нему count и price
        existingItem.totalCount += item.count;
        existingItem.totalPrice += item.count * item.price;
      } else {
        // Если объекта нет, создаем новый с totalCount и totalPrice
        result.push({
          id: item.id,
          color: item.color,
          name: item.name,
          totalCount: item.count,
          totalPrice: item.count * item.price,
        });
      }
    });

    return result;
  }

  const handle_submit = (values) => {
    let result = "";
    let products = "";
    result =
      pageStore.mailType == "почта России" ||
      pageStore.mailType == "почта по миру"
        ? `Здравствуйте , хочу сделать заказ! 
    Мои данные для заказа:
    ФИО: ${values.first_name} ${values.last_name}
    ТЕЛЕФОН: ${number}
    АДРЕС: ${values.adress}
    ДОСТАВКА: ${pageStore.mailType}
    ИНДЕКС: ${values.index}
    СУММА: ${aggregateItemsByIdAndColor(pageStore.cart).reduce(
      (acc, elem) => acc + elem.totalPrice,
      0
    )} ₽
    ТОВАРЫ: 
    ${aggregateItemsByIdAndColor(pageStore.cart).reduce(
      (acc, elem) =>
        acc +
        `товар ${elem.name}, цвет: ${elem.color} количество: ${elem.totalCount}шт, итоговая цена: ${elem.totalPrice}\n`,
      ""
    )}

    Жду от вас обратной связи`
        : `Здравствуйте , хочу сделать заказ! 
    Мои данные для заказа:
    ФИО: ${values.first_name} ${values.last_name}
    ТЕЛЕФОН: ${number}
    АДРЕС: ${values.adress}
    ДОСТАВКА: ${pageStore.mailType}
    СУММА: ${aggregateItemsByIdAndColor(pageStore.cart).reduce(
      (acc, elem) => acc + elem.totalPrice,
      0
    )} ₽
    ТОВАРЫ: 
    ${aggregateItemsByIdAndColor(pageStore.cart).reduce(
      (acc, elem) =>
        acc +
        `товар ${elem.name}, цвет: ${elem.color} количество: ${elem.totalCount}шт, итоговая цена: ${elem.totalPrice}\n`,
      ""
    )}

    Жду от вас обратной связи`;
    pageStore.updateResult(result);
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
    pageStore.mailType === "почта России" ||
    pageStore.mailType === "почта по миру"
      ? {
          last_name: "",
          first_name: "",
          phone: "",
          pochta: "сдэк (СДЭК)",
          index: "",
          adress: "",
        }
      : pageStore.mailType == "самовывоз"
      ? {
          last_name: "",
          first_name: "",
          phone: "",
          pochta: "сдэк (СДЭК)",
          adress: "Адрес самовывоза артема",
        }
      : {
          last_name: "",
          first_name: "",
          phone: "",
          pochta: "сдэк (СДЭК)",
          adress: "",
        };

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

              <p style={{ padding: "0px", marginTop: "15px" }}>
                {pageStore.mailType == "сдэк (СДЭК)"
                  ? "Введите адрес пункта выдачи СДЭК"
                  : pageStore.mailType == "почта России"
                  ? "Введите ваш полный адрес с индексом"
                  : `Для оформления самовывоза, подтвердите ваш заказ у менеджера нажав кнопку «Оформить заказ». Адрес самовывоза вам сообщит менеджер. `}
              </p>
              {pageStore.mailType != "самовывоз" ? (
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
              ) : null}

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
});
export default OformitPage;
