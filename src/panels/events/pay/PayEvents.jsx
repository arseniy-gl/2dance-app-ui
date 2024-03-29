// @flow

import React, { useState, useEffect } from "react";
import { Cell, CellButton, Group, List, Panel } from "@vkontakte/vkui";
import { PanelHeader } from "@vkontakte/vkui";
import LeftPanelHeaderButtons       from "../../../components/controlls/LeftPanelHeaderButtons";
import { getQueryParams, navigate } from "hookrouter";
import { getEvents, postTickets }   from "../../../api";
import useUserToken      from "../../../hooks/useUserToken";
import Avatar            from "@vkontakte/vkui/dist/components/Avatar/Avatar";
import { UserCell }      from "../../main/main/UserCell";
import vkConnect         from "@vkontakte/vkui-connect-promise";
import { back, go }      from "../../../utils/default/url";
import useConfigs        from "../../../hooks/useConfigs";
import usePrice          from "../../../hooks/usePrice";
import YandexMoneyButton from "./YandeMoneyButton";
import useUserById       from "../../../hooks/useUserById";
import useCheckRole      from "../../../hooks/useCheckRole";

type P = {
  id: EventsViewId,
  activePanel: EventsViewId
};

const roles = ["admin"];

export const PayEvents = (p: P) => {
  const { event_id, pass, sec, vk_user_id, ...query } = getQueryParams(),
        isAdmin = useCheckRole(roles);
  const [event, setEvent] = useState<?DanceEvent>(),
        token = useUserToken(),
        [user:?User] = useUserById(parseInt(vk_user_id), token);
  const price = usePrice(event, pass),
        [configs] = useConfigs();

  useEffect(() => {
    getEvents(event_id).then(res => setEvent(res[0]));
    if (window.ym) {
      window.ym(55883914, "reachGoal", "open-event-pay");
    }
  }, [event_id]);

  const vkPay = async () => {
    if (pass && query.vk_group_id && token && event) {
      try {
        const res = await vkConnect.send("VKWebAppOpenPayForm", {
          app_id: parseInt(process.env.REACT_APP_ID),
          action: "pay-to-group",
          params: {
            amount: price,
            group_id: parseInt(query.vk_group_id)
          }
        });
        if (res.type === "VKWebAppOpenPayFormResult" && res.data.status) {
          const ticket: $Rest<Ticket, {| _id: string |}> = {
            ticketType: pass,
            vkGroupId: parseInt(query.vk_group_id),
            vkUserId: parseInt(vk_user_id),
            eventId: event._id,
            transactionId: res.data.transaction_id,
            amount: res.data.amount,
            extra: res.data.extra,
            isClose: false,
            secondUserId:
              pass === "double-pass" && sec ? parseInt(sec) : undefined
          };
          if (window.ym) {
            window.ym(55883914, "reachGoal", "pay-ticket", {
              order_price: res.data.amount
            });
          }
          await postTickets(ticket);
          if (pass === "double-pass") {
            await postTickets({
              ticketType: pass,
              vkGroupId: parseInt(query.vk_group_id),
              vkUserId: parseInt(sec),
              secondUserId: parseInt(vk_user_id),
              eventId: event._id,
              transactionId: res.data.transaction_id,
              amount: res.data.amount,
              extra: res.data.extra,
              isClose: false
            });
          }
          navigate("/", false, query);
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  const isVkPay = configs && configs.payKinds && configs.payKinds.find(p => p.name === 'vk-pay') && configs.payKinds.find(p => p.name === 'vk-pay').on;
  const isYMoney = configs && configs.payKinds && configs.payKinds.find(p => p.name === 'yandex-money') && configs.payKinds.find(p => p.name === 'yandex-money').on;
  const isAltPay = configs && configs.payKinds && configs.payKinds.find(p => p.name === 'alt-pay') && configs.payKinds.find(p => p.name === 'alt-pay').on;

  return (
    <Panel id={p.id}>
      <PanelHeader left={<LeftPanelHeaderButtons type="back" back={back} />}>
        Оплата
      </PanelHeader>
      {event && user && (
        <>
          <Group>
            <Cell
              before={<Avatar size={72} src={event.avatar} />}
              description={
                <>
                  {isAdmin && <div>id: {event_id}</div>}
                  <div>{new Date(event.timestamp).toLocaleString()}</div>
                  <div>{price} ₽</div>
                </>
              }
              size="l"
            >
              {event.label}
            </Cell>
          </Group>
          {query && pass === "double-pass" && sec && (
            <Group title="Мой +1">
              <UserCell userId={parseInt(sec)} />
            </Group>
          )}
          <Group>
            <List>
              {isVkPay && <CellButton onClick={vkPay}>VkPay</CellButton>}
              {isYMoney && <YandexMoneyButton user={user.vkUser} event={event} />}
              {isAltPay && <CellButton onClick={() => go("/events/alt-pay")}>
                Оплачено вне приложения
              </CellButton>}
            </List>
          </Group>
        </>
      )}
    </Panel>
  );
};
