// @flow

import React, { useState }    from "react";
import {
  Panel,
  PanelHeader,
  PullToRefresh
}                             from "@vkontakte/vkui";
import LeftPanelHeaderButtons from "../../../components/controlls/LeftPanelHeaderButtons";
import { back }               from "../../../utils/default/url";
import { useSelector }        from "react-redux";
import AltPayInfo             from "./AltPayInfo";
import useTicketsToApprovePay from "../../../hooks/useTicketsToApprovePay";

type P = {
  id: MenuViewId
};

export default function CheckAltPayPanel(p: P) {
  const token = useSelector(({ user }: AppState) => user.token);
  const [altPay, refresh] = useTicketsToApprovePay(token),
    [fetching, setFetching] = useState(false);

  const onRefresh = async () => {
    setFetching(true);
    await refresh();
    setFetching(false);
  };

  return (
    <Panel id={p.id}>
      <PanelHeader left={<LeftPanelHeaderButtons back={back} type="back" />}>
        Проверка оплаты
      </PanelHeader>
      <PullToRefresh onRefresh={onRefresh} isFetching={fetching}>
        {token &&
          altPay &&
          altPay.map(ap => (
            <AltPayInfo key={`alt-pay-` + ap._id} ticket={ap} token={token} onRefresh={refresh} />
          ))}
      </PullToRefresh>
    </Panel>
  );
}
