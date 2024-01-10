import React from "react";

// nameCenterをbooleanで定義
const Profile = ({ nameCenter }: { nameCenter: boolean }) => {
  return (
    <>
      {nameCenter ? (
        <>
          <h3 className="text-center text-2xl text-black font-semibold pb-4">
            き
          </h3>
          地方国立数学科卒 ⇒ 高校数学教員 (3年間) ⇒
          一念発起してITエンジニア(インフラ)に <br />
          このブログは駆け出しインフラエンジニアとしての学習の記録(のつもり)です。
          <br />
          AWS CLF / SAA / SOA / DVA / SAP / DOP 取得 軽度のスバリスト
        </>
      ) : (
        <>
          <h3>き</h3>
          地方国立数学科卒
          <br />
          ⇒ 高校数学教員 (3年間)
          <br />
          ⇒ 一念発起してITエンジニア(インフラ)に
          <br />
          <br />
          このブログは駆け出しインフラエンジニアとしての学習の記録(のつもり)です。
          <br />
          AWS CLF / SAA / SOA / DVA / SAP / DOP 取得
          <br />
          <br />
          軽度のスバリスト
        </>
      )}
    </>
  );
};

export default Profile;
