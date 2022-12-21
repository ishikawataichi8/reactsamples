/* eslint react-hooks/exhaustive-deps:off*/
import React, { useEffect, useState } from "react";
import ColorfulMessage from "./components/ColorfulMessage";
import { ColorfulMessage2 } from "./components/ColorfulMessage2";

const App = () => {
  //const [変数,変数を変更する関数] = useState(初期値);
  //初期値は再レンダリングされたときは反映されない、つまり最初の読み込みのみで使われる
  const [num, setNum] = useState(0);
  const [faceShowFlag, setFaceShowFlag] = useState(true);

  const onClickButtonCountUp = () => {
    setNum(num + 1);
  };

  //後ろの3の倍数の判定がnumが変更された時のみ実行するようにしないと、onClickSwitchShowFlagを実行しても
  //再レンダリングの際に3の倍数の判定のところでまた値が元に戻ってしまうため反応しなくなってしまう。
  //→3の倍数の判定がnumが変更された時のみ実行するようにする
  const onClickSwitchShowFlag = () => {
    setFaceShowFlag(!faceShowFlag);
  };

  useEffect(() => {
    if (num % 3 === 0) {
      //setFaceShowFlag(true);にするとfaceshowflagが変更されたタイミング
      //(つまりsetshowflag関数が呼ばれるとき)で再レンダリング
      //(コードが再び上から読み込まれるので)ここのsetshowflag関数が何度も呼ばれてしまいループしてしまう。
      //→faceshowflagがfalseの時のみsetFaceShowFlag(true)を呼び出せば良い。
      //(再レンダリングの際,faceshowflagがtrueになっているのでsetFaceShowFlag(true)を呼び出さずに済む)

      //||は左がfalseの時右を返す。
      faceShowFlag || setFaceShowFlag(true);
    } else {
      //&&は左がtrueの時右を返す。
      faceShowFlag && setFaceShowFlag(false);
    }
  }, [num]); //第二引数に含まれる変数が変化した時のみ呼び出される。
  //第二引数が[](からの配列)の時最初の一回のみ実行する(再レンダリングされても実行されない)

  //returnでhtmlを出力する
  return (
    //<>から先はhtmlを記述する(html内でjsを記述したかったら{}で囲む

    <>
      <h1 style={{ color: "red" }}>こんにちは</h1>
      <ColorfulMessage color="blue" message="お元気ですか?" />
      <ColorfulMessage color="green" message="元気です!" />
      <ColorfulMessage2 color="pink">元気です!</ColorfulMessage2>
      <button onClick={onClickButtonCountUp}>カウントアップ</button>
      <p>{num}</p>
      <br />
      <button onClick={onClickSwitchShowFlag}>on/off</button>
      {/*&&は本来左がtrueの時右を返す */}
      {faceShowFlag && <p>( ＾∀＾)</p>}
    </>
  );
};

export default App;
