const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();
ASSET_MANAGER.queueDownload("./Shot.png");
ASSET_MANAGER.queueDownload("./Run.png");

ASSET_MANAGER.downloadAll(() => {
    const canvas = document.getElementById("gameWorld");
    const ctx = canvas.getContext("2d");

    const samurai = new Samurai(gameEngine);
    gameEngine.addEntity(samurai);

    gameEngine.init(ctx);
    gameEngine.start();
});
