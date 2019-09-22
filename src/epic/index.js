// @flow

import React from "react";
import { AppTabbar } from "./tabbar";
import { MainView } from "../views/main/MainView";
import { Epic } from "@vkontakte/vkui";
import { extractEpicViewId } from "./utils";

type P = {
  epicId: string,
  panelId?: string
};

export const RootEpic = (p: P) => {
  const id: EpicViewId = extractEpicViewId(p.epicId);

  return (
    <Epic activeStory={id} tabbar={<AppTabbar selected={id} />}>
      <MainView id="main" panelId={p.panelId} />
    </Epic>
  );
};