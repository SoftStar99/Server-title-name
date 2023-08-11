//처음 시작하면 freedom1 freedom2라는 태그가 없으니 칭호 뉴비와 이름은 자기 닉네임으로 고정됩니다. 칭호와 이름 아이템을 작동하면 각 각 freedom1 2의 태그가 주어지면서 고정해제


import { system } from "@minecraft/server"
import { world } from '@minecraft/server'
import { ActionFormData, ModalFormData, MessageFormData } from '@minecraft/server-ui'

//==================================================================================================================================

system.runInterval(() => {
  for (let player of world.getPlayers()) {
    if (!player.hasTag("freedom1")) {
      player.runCommandAsync(`tag @s add rank.§e뉴비`)
    }
  }
})

system.runInterval(() => {
  for (let player of world.getPlayers()) {
    if (!player.hasTag("freedom2")) {
      player.runCommandAsync(`tag @s add name.${player.name}`)
    }
  }
})

//==================================================================================================================================

system.runInterval(() => {
  for (let player of world.getPlayers()) {
    if (player.hasTag("rankremove")) {
      player.removeTag(player.getTags().find((tag) => tag.startsWith("rank.")));
      player.removeTag("rankremove");
    }
  }
})

system.runInterval(() => {
  for (let player of world.getPlayers()) {
    if (player.hasTag("nameremove")) {
      player.removeTag(player.getTags().find((tag) => tag.startsWith("name.")));
      player.removeTag("nameremove");
    }
  }
})

//==================================================================================================================================

world.beforeEvents.itemUse.subscribe((eventData) => {
  let item = eventData.itemStack;
  let player = eventData.source;
  if (item.typeId == "qwer:freedomchingho") {
    system.run(() => {
      freedomchingho(player);
      player.runCommandAsync(`tag @s add freedom1`)
    });
  }
});

world.beforeEvents.itemUse.subscribe((eventData) => {
  let item = eventData.itemStack;
  let player = eventData.source;
  if (item.typeId == "qwer:freedomname") {
    system.run(() => {
      freedomname(player);
      player.runCommandAsync(`tag @s add freedom2`)
    });
  }
});

world.beforeEvents.itemUse.subscribe((eventData) => {
  let item = eventData.itemStack;
  let player = eventData.source;
  if (item.typeId == "qwer:reset") {
    system.run(() => {
      reset(player);
    });
  }
});

//==================================================================================================================================

function freedomchingho(player) {
  const modal = new ModalFormData()
  .title("§l§8[ §t자유칭호 입력§8 ]")
  .textField("§l§b---------------------------\n\n자유 칭호를 입력해주세요.\n원하는 칭호를 입력해주세요.\n\n---------------------------", "칭호 입력하기")
  modal.show(player).then(result => {
    if (result.formValues[0]) {

      const freedomchingho = result.formValues[0].replace(/\s+/g, '');
      if (freedomchingho.length === 0) { // 띄어쓰기 오류 제한
        player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§l§c➥ 공백은 입력 할 수 없습니다."}]}`);
        player.runCommandAsync(`playsound note.pling @s`);
        return;
      }
      const maxStringLength = 10;
      if (freedomchingho.length > maxStringLength) { // 글자수 제한
        player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§l§c➥ 글자수를 ${maxStringLength}자 이내로 입력해주세요."}]}`);
        player.runCommandAsync(`playsound note.pling @s`);
        return;
      }
      // 실행
      player.runCommandAsync(`tag @s add rankremove`);
      player.runCommandAsync(`tag @s add rank.${freedomchingho}`)
      player.runCommandAsync(`clear @s qwer:freedomchingho 0 1`)
      player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§l§a➥ 칭호가 §f${result.formValues[0]}§a§l으로 변경되었습니다."}]}`)
      player.runCommandAsync(`playsound random.levelup @s`)
    } else {
      player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§l§c➥ 원하시는 칭호를 입력해주세요."}]}`)
      player.runCommandAsync(`playsound note.pling @s`)
    }
  })
}

function freedomname(player) {
  const modal = new ModalFormData()
    .title("§l§8[ §t한글닉 입력§8 ]")
    .textField("§l§b---------------------------\n\n닉네임을 입력해주세요.\n원하는 이름을 입력해주세요.\n\n---------------------------", "이름 입력하기")
  modal.show(player).then(result => {
    if (result.formValues[0]) {

      const freedomname = result.formValues[0].replace(/\s+/g, '');
      if (freedomname.length === 0) { // 띄어쓰기 오류 제한
        player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§l§c➥ 공백은 입력 할 수 없습니다."}]}`);
        player.runCommandAsync(`playsound note.pling @s`);
        return;
      }
      const maxStringLength = 10;
      if (freedomchingho.length > maxStringLength) { // 글자수 제한
        player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§l§c➥ 글자수를${maxStringLength}자 이내로 입력해주세요."}]}`);
        player.runCommandAsync(`playsound note.pling @s`);
        return;
      }
      // 실행
      player.runCommandAsync(`tag @s add nameremove`)
      player.runCommandAsync(`tag @s add name.${freedomname}`)
      player.runCommandAsync(`clear @s qwer:freedomname 0 1`)
      player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§l§a➥ 칭호가 §f${result.formValues[0]}§a§l으로 변경되었습니다."}]}`)
      player.runCommandAsync(`playsound random.levelup @s`)
    } else {
      player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§l§c➥ 원하시는 이름을 입력해주세요."}]}`)
      player.runCommandAsync(`playsound note.pling @s`)
    }
  })
}


function reset(player) {
  var playerObjects = []
  var operations = []
  var players = world.getPlayers()
  for (let playerr of players) {
    operations.push(playerr.name)
    playerObjects.push(playerr)
  }
  const modal = new ModalFormData()
    .title("§l§8[ §l§c리셋§8 ]")
    .dropdown("§l§e---------------------------\n\n오류가 날 때 설정창입니다.\n이름이나 칭호에 오류가 뜰 때 리셋하는데 사용합니다.\n\n---------------------------\n\n§c오류가 난 플레이어의 이름이 뭔가요?", operations)
    .textField("§l§c어떠한 오류인가요?", "칭호 or 이름")
  modal.show(player).then(result => {
    if (result.formValues[1] == `칭호`) {
      player.runCommandAsync(`tag @s add rankremove`)
      player.runCommandAsync(`tag @s remove freedom1`)
    }
    if (result.formValues[1] == `이름`) {
      player.runCommandAsync(`tag @s add nameremove`)
      player.runCommandAsync(`tag @s remove freedom2`)
    }
  })
}