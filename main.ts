namespace SpriteKind {
    export const Terrain = SpriteKind.create()
}
// batida no adversário
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Player, function (sprite, otherSprite) {
    if (obj_enemy.vy == 50) {
        if (obj_player.y < obj_enemy.y) {
            sprite.setVelocity(randint(40, -40), 130)
            crash()
        } else {
            sprite.setVelocity(randint(40, -40), -130)
            crash()
        }
    }
})
// função batida
function crash () {
    info.changeLifeBy(-1)
    scene.cameraShake(2, 200)
    music.smallCrash.play()
    obj_player.sayText(crash_list._pickRandom(), 1000, false)
}
// função cria adversário
function createEnemy () {
    obj_enemy = sprites.create(assets.image`spr_carEnemy`, SpriteKind.Projectile)
    obj_enemy.setFlag(SpriteFlag.AutoDestroy, true)
    animation.runImageAnimation(
    obj_enemy,
    assets.animation`obj_enemyAnimated`,
    120,
    true
    )
    obj_enemy.setPosition(randint(46, 113), -10)
    obj_enemy.setVelocity(randint(20, -20), 50)
}
// colisão IA terreno
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Terrain, function (sprite, otherSprite) {
    if (obj_enemy.vy == 50) {
        sprite.setVelocity(0, 50)
    }
})
// colisão terreno
sprites.onOverlap(SpriteKind.Player, SpriteKind.Terrain, function (sprite, otherSprite) {
    timer.throttle("colTerreno", 1000, function () {
        crash()
    })
})
// fala ao passar alguém
sprites.onDestroyed(SpriteKind.Projectile, function (sprite) {
    if (sprite.y > obj_player.y) {
        if (Math.percentChance(30)) {
            obj_player.sayText(quotes_list._pickRandom(), 1000, false)
        }
    }
})
// init
// criado por Leonardo Rodrigues Silva
// 04/01/2023
let obj_enemy: Sprite = null
let crash_list: string[] = []
let quotes_list: string[] = []
let obj_player: Sprite = null
game.splash("Created by @Leozlk", "- 2023 -")
obj_player = sprites.create(assets.image`spr_car`, SpriteKind.Player)
let TerrainCollision = sprites.create(assets.image`spr_terrainCollision`, SpriteKind.Terrain)
obj_player.z = 10
obj_player.setPosition(80, 94)
obj_player.setStayInScreen(true)
info.setScore(0)
info.setLife(3)
animation.runImageAnimation(
obj_player,
assets.animation`obj_playerAnimated`,
80,
true
)
controller.moveSprite(obj_player)
scene.setBackgroundColor(11)
scene.setBackgroundImage(assets.image`bkg_game`)
quotes_list = ["bye bye", "eat my dust!", "vrummm"]
crash_list = ["arghhh", "ouch!"]
// scroll do mapa
game.onUpdate(function () {
    scroller.scrollBackgroundWithSpeed(0, 150)
})
// adversário ficar mudando de direção
game.onUpdate(function () {
    if (obj_enemy.vy == 50) {
        timer.throttle("a", 1000, function () {
            obj_enemy.setVelocity(randint(30, -30), 50)
        })
    }
})
// pontuação a cada x(tempo)
game.onUpdateInterval(100, function () {
    info.changeScoreBy(1)
})
// a cada x(tempo) gerar adversário
game.onUpdateInterval(3000, function () {
    createEnemy()
})
