import { world } from "@minecraft/server";
import { prefix_tag, default_display } from "./configuration";

function getRanks(player) {
  const ranks = player
    .getTags()
    .map((v) => {
      if (!v.startsWith(prefix_tag[0].rank)) return null;
      return v.substring(prefix_tag[0].rank.length);
    })
    .filter((x) => x);
  return ranks.length == 0 ? [default_display[0].rank] : ranks;
}

function getOnames(player) {
  const onames = player
    .getTags()
    .map((v) => {
      if (!v.startsWith(prefix_tag[0].oname)) return null;
      return v.substring(prefix_tag[0].oname.length);
    })
    .filter((x) => x);
  return onames.length == 0 ? [default_display[0].oname] : onames;
}


world.beforeEvents.chatSend.subscribe((data) => {
  data.sendToTargets = true;
  data.targets = [];
  const ranks = getRanks(data.sender).join(" §r§f】 【§l ");
  const onames = getOnames(data.sender)
  const message = data.message;
  default_display[0].clan_chat
    world.sendMessage(`§f【 §l${ranks}§r§f 】 §r§f§l${onames} §f•§r ${message}`)
});
