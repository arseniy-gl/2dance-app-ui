// @flow

import React, { useMemo } from "react";
import Avatar from "@vkontakte/vkui/dist/components/Avatar/Avatar";
import { Cell } from "@vkontakte/vkui";
import EventCellDescription from "./EventCellDescription";
import EventCellBottomContent from "./EventCellBottomContent";
import Icon24MoreHorizontal from "@vkontakte/icons/dist/24/more_horizontal";
import AdminPopoutEvent from "./AdminPopoutEvent";
import useCheckRole from "../../../hooks/useCheckRole";

type P = {
  event: DanceEvent,
  setPopout: (?React$Node) => void
};

const roles = ["admin", "editor", "reception"];

export default function EventCell(p: P) {
  const isAccessContext = useCheckRole(roles);

  const onAdminMenu = useMemo(
    () => (event: DanceEvent) => () => {
      p.setPopout(
        <AdminPopoutEvent onClose={() => p.setPopout(null)} event={event} />
      );
    },
    [p]
  );

  return (
    <Cell
      before={<Avatar size={72} src={p.event.avatar} />}
      description={<EventCellDescription event={p.event} />}
      bottomContent={<EventCellBottomContent event={p.event} />}
      size="l"
      asideContent={
        isAccessContext && (
          <Icon24MoreHorizontal onClick={onAdminMenu(p.event)} />
        )
      }
    >
      {p.event.label}
    </Cell>
  );
}
