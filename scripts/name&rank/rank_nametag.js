import { world, system } from "@minecraft/server";
import { prefix_tag, default_display } from "./configuration.js";

system.runInterval((data) => {
  for (const player of world.getPlayers()) {
    let playerRank =
      player
        .getTags()
        .find((tag) => tag.startsWith(prefix_tag[0].rank))
        ?.substring(5) ?? `${default_display[0].rank}`;
    let playerOname =
      player
        .getTags()
        .find((tag) => tag.startsWith(prefix_tag[0].oname))
        ?.substring(5) ?? `${default_display[0].oname}`;

    
    default_display[0]
      player.nameTag = (`§7【 §f§l${playerRank}§r§7 】\n§f§l${playerOname}`);
  }
}, 0);