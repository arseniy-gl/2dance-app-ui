// @flow

import React, { useMemo, useCallback } from "react";
import {
  Button,
  Cell,
  FormLayout,
  Group,
  Input,
  Panel,
  PanelHeader,
  PanelSpinner
} from "@vkontakte/vkui";
import LeftPanelHeaderButtons from "../../../components/controlls/LeftPanelHeaderButtons";
import { getQueryParams, navigate } from "hookrouter";
import { useEventById } from "../../../hooks/useEventById";
import { makeDateString, makeTimeString } from "./utils";
import EventForm from "./EventForm";
import { putEvents } from "../../../api";

type P = {
  id: EventsViewId
};

export default function EventEdit(p: P) {
  const { event_id, ...params } = useMemo(getQueryParams, []);
  const event = useEventById(event_id);

  const onSubmit = useMemo(() => (newEvent: DanceEvent) => {
    putEvents(newEvent).then(() => {
      navigate("/events", false, params);
    });
  }, []);

  return (
    <Panel id={p.id}>
      <PanelHeader
        left={
          <LeftPanelHeaderButtons
            type="back"
            back={() => navigate("/events", false, params)}
          />
        }
      >
        {event ? event.label : "Загрузка..."}
      </PanelHeader>
      {!event && <PanelSpinner />}
      {event && <EventForm event={event} onSubmit={onSubmit} />}
    </Panel>
  );
}