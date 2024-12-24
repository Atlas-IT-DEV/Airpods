import DropDown from "./dropDown";
import { useEffect } from "react";
import { useState } from "react";
import redact from "../redact";
import { useStores } from "../store/store_context";
import { observer } from "mobx-react-lite";
const ProductAdditionals = observer(({ product }) => {
  /* fetch(
      "https://pop.applepodsblack.ru/api/products?populate=deep&pagination[limit]=100"
    )
      .then((response) => response.json())
      .then(function (commits) {
        let data = commits.data;
        let autonomy_buffer = [];
        let sound_buffer = [];
        let mic_buffer = [];
        let product = "";
        for (let elem of data) {
          if (elem.id == window.GlobalProductId) product = elem;
        }
        let autonomy = product.attributes.autonomy;
        let quality_mic = product.attributes.quality_mic;
        let quality_sound = product.attributes.quality_sound;
        setEquipment(product.attributes.equipment);
        setFunctional(product.attributes.functional);
        setChars(product.attributes.characteristics);
        for (let i = 0; i < 10; i++) {
          if (autonomy > 0) {
            autonomy_buffer.push(
              <div
                className="stats_point audio"
                style={{
                  background: `var(--Yellow-gradient, linear-gradient(93deg, #F5EA99 -3.52%, #DB9B45 100%))
            `,
                }}
              ></div>
            );
            autonomy -= 1;
          } else {
            autonomy_buffer.push(
              <div
                className="stats_point audio"
                style={{
                  backgroundColor: `var(--Gray, #4B4B4B)
            `,
                }}
              ></div>
            );
          }
        }
        if (window.GlobalProductCategory == "watch")
          setDropInf(["Скорость меню", "Цветопередача"]);
        setAutonomy(autonomy_buffer);
        for (let i = 0; i < 10; i++) {
          if (quality_mic > 0) {
            mic_buffer.push(
              <div
                className="stats_point audio"
                style={{
                  background: `var(--Yellow-gradient, linear-gradient(93deg, #F5EA99 -3.52%, #DB9B45 100%))
            `,
                }}
              ></div>
            );
            quality_mic -= 1;
          } else {
            mic_buffer.push(
              <div
                className="stats_point audio"
                style={{
                  backgroundColor: `var(--Gray, #4B4B4B)
            `,
                }}
              ></div>
            );
          }
        }
        setMicQuality(mic_buffer);
        for (let i = 0; i < 10; i++) {
          if (quality_sound > 0) {
            sound_buffer.push(
              <div
                className="stats_point audio"
                style={{
                  background: `var(--Yellow-gradient, linear-gradient(93deg, #F5EA99 -3.52%, #DB9B45 100%))
            `,
                }}
              ></div>
            );
            quality_sound -= 1;
          } else {
            sound_buffer.push(
              <div
                className="stats_point audio"
                style={{
                  backgroundColor: `var(--Gray, #4B4B4B)
            `,
                }}
              ></div>
            );
          }
        }
        setSoundQuality(sound_buffer);
      }); */
  return (
    <div id="addon_info">
      <p>Дополнительная информация</p>
      {product?.category_id == 4 ||
      product?.category_id == 5 ||
      product?.category_id == 3 ? null : (
        <div id="stats">
          <div id="stats_inner">
            <div className="stats_row">
              <div className="stats_points">
                {[
                  ...[
                    ...Array(
                      Number(
                        product?.characteristics.find((elem) => elem.id == 7)
                          .value != "NULL"
                          ? product?.characteristics.find(
                              (elem) => elem.id == 7
                            ).value
                          : 0
                      )
                    ).keys(),
                  ].map((elem) => {
                    return (
                      <div
                        className="stats_point audio"
                        style={{
                          background: `var(--Yellow-gradient, linear-gradient(93deg, #F5EA99 -3.52%, #DB9B45 100%))`,
                        }}
                      ></div>
                    );
                  }),
                  ,
                  ...[
                    ...Array(
                      10 -
                        Number(
                          product?.characteristics.find((elem) => elem.id == 7)
                            .value != "NULL"
                            ? product?.characteristics.find(
                                (elem) => elem.id == 7
                              ).value
                            : 0
                        )
                    ).keys(),
                  ].map((elem) => {
                    return (
                      <div
                        className="stats_point audio"
                        style={{
                          backgroundColor: `var(--Gray, #4B4B4B)`,
                        }}
                      ></div>
                    );
                  }),
                ]}
              </div>
              <p>
                {product?.category_id == 2 ? "Скорость меню" : "Качество звука"}
              </p>
            </div>
            <div className="stats_row">
              <div className="stats_points">
                {[
                  ...[
                    ...Array(
                      Number(
                        product?.characteristics.find((elem) => elem.id == 8)
                          .value != "NULL"
                          ? product?.characteristics.find(
                              (elem) => elem.id == 8
                            ).value
                          : 0
                      )
                    ).keys(),
                  ].map((elem) => {
                    return (
                      <div
                        className="stats_point audio"
                        style={{
                          background: `var(--Yellow-gradient, linear-gradient(93deg, #F5EA99 -3.52%, #DB9B45 100%))`,
                        }}
                      ></div>
                    );
                  }),
                  ,
                  ...[
                    ...Array(
                      10 -
                        Number(
                          product?.characteristics.find((elem) => elem.id == 8)
                            .value != "NULL"
                            ? product?.characteristics.find(
                                (elem) => elem.id == 8
                              ).value
                            : 0
                        )
                    ).keys(),
                  ].map((elem) => {
                    return (
                      <div
                        className="stats_point audio"
                        style={{
                          backgroundColor: `var(--Gray, #4B4B4B)`,
                        }}
                      ></div>
                    );
                  }),
                ]}
              </div>
              <p style={{textAlign:"end"}}>
                {product?.category_id == 2
                  ? "Качество цветопередачи"
                  : "Качество микрофона"}
              </p>
            </div>
            <div className="stats_row">
              <div className="stats_points">
                {[
                  ...[
                    ...Array(
                      Number(
                        product?.characteristics.find((elem) => elem.id == 4)
                          .value != "NULL"
                          ? product?.characteristics.find(
                              (elem) => elem.id == 4
                            ).value
                          : 0
                      )
                    ).keys(),
                  ].map((elem) => {
                    return (
                      <div
                        className="stats_point audio"
                        style={{
                          background: `var(--Yellow-gradient, linear-gradient(93deg, #F5EA99 -3.52%, #DB9B45 100%))`,
                        }}
                      ></div>
                    );
                  }),
                  ,
                  ...[
                    ...Array(
                      10 -
                        Number(
                          product?.characteristics.find((elem) => elem.id == 4)
                            .value != "NULL"
                            ? product?.characteristics.find(
                                (elem) => elem.id == 4
                              ).value
                            : 0
                        )
                    ).keys(),
                  ].map((elem) => {
                    return (
                      <div
                        className="stats_point audio"
                        style={{
                          backgroundColor: `var(--Gray, #4B4B4B)
            `,
                        }}
                      ></div>
                    );
                  }),
                ]}
              </div>
              <p>Автономность</p>
            </div>
          </div>
        </div>
      )}
      {product?.category_id != 4 && (
        <div id="functionality">
          <DropDown
            header="Комплектация"
            content={redact(
              product?.characteristics.find((elem) => elem.id == 9).value
            )}
          />
          <hr
            style={{ width: "100%", borderColor: "var(--Gray, #4B4B4B)" }}
          ></hr>
          <DropDown
            header="Функционал"
            content={redact(
              product?.characteristics.find((elem) => elem.id == 10).value
            )}
          />
          <hr
            style={{ width: "100%", borderColor: "var(--Gray, #4B4B4B)" }}
          ></hr>
          <DropDown
            header="Технические характеристики"
            content={redact(
              product?.characteristics.find((elem) => elem.id == 11).value
            )}
          />
        </div>
      )}
    </div>
  );
});
export default ProductAdditionals;
