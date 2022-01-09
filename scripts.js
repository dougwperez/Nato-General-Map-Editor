var canvas = document.getElementById("renderCanvas");

var engine = null;
var scene = null;
var sceneToRender = null;
var assetSelector = "Nuthin";
var currentTile = "";
const clearAssetSelector = () => {
  assetSelector = "Nothing";
};
var createDefaultEngine = function () {
  return new BABYLON.Engine(canvas, true, {
    preserveDrawingBuffer: true,
    stencil: true,
    disableWebGL2Support: false,
  });
};
var createScene = async function () {
  // This creates a basic Babylon Scene object (non-mesh)
  var scene = new BABYLON.Scene(engine);
  // scene.clearColor = new BABYLON.Color3(0.94, 1.0, 0.98);

  var selector;
  var camera = new BABYLON.ArcRotateCamera(
    "camera",
    BABYLON.Tools.ToRadians(85),
    BABYLON.Tools.ToRadians(75),
    10,
    BABYLON.Vector3.Zero(),
    scene
  );

  camera.lowerRadiusLimit = 5;

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  var light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );

  // Skybox
  var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 1000.0 }, scene);
  var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
  skyboxMaterial.backFaceCulling = false;
  skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(
    "textures/skybox",
    scene
  );
  skyboxMaterial.reflectionTexture.coordinatesMode =
    BABYLON.Texture.SKYBOX_MODE;
  skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
  skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
  skybox.material = skyboxMaterial;

  //2d tiles
  tiles = {
    snow: "./textures/snow.jpg",
    stream: "./textures/stream.jpg",
    freeway: "./textures/freeway.jpg",
    intersection: "./textures/intersection.jpg",
    concrete: "./textures/concrete.jpg",
    rubble: "./textures/rubble.jpeg",
    farm: "./textures/farm.jpeg",
    destroyedRoad: "./textures/destroyedRoad.jpeg",
    road: "./textures/road.jpeg",
    desert: "./textures/ground.jpg",
    grassLand: "./textures/grassLand.png",
    water: "./textures/lake.jpg",
    altRoad:
      "https://i.pinimg.com/474x/83/9c/04/839c0417d8792b3d2eda93a5ad67ab9b.jpg",
    street: "./textures/road2.jpeg",
    rust: "./textures/rust.jpg",
    dirtyRoad: "./textures/dirtyRoad.jpg",
    suburbanRoad: "./textures/suburbanRoad.jpg",
    damagedRoad: "./textures/damagedRoad.jpg",
    cityRoad: "./textures/cityRoad.jpg",
    concreteTiles: "./textures/concreteTiles.jpg",
    concreteBricks: "./textures/concreteBricks.jpg",
    hedgeRows: "./textures/hedgeRows.jpg",

    dryGrass: "./textures/dryGrass.jpg",
    dryGreenGrass: "./textures/dryGreenGrass.jpg",
    pebbles: "./textures/pebbles.jpg",
    lightSnow: "./textures/lightSnow.jpg",
    rapids: "./textures/rapids.jpg",
    rocky: "./textures/rocky.jpg",
    wetMud: "./textures/wetMud.jpg",
    mudGrassMix: "./textures/mudGrassMix.jpg",
    underGrowthGreenGrass: "./textures/underGrowthGreenGrass.jpg",
    mud: "./textures/mud.jpg",
    plateau: "./textures/pebblesNGrass.jpg",
  };

  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.7;

  //load an asset container for the hex tile
  const hexTileImport = await BABYLON.SceneLoader.LoadAssetContainerAsync(
    "https://assets.babylonjs.com/meshes/",
    "hexTile.glb",
    scene
  );

  //The math and properties for creating the hex grid.
  //STARTING SIZE FOR GRID -DP
  let gridSize = 10;
  let hexLength = 1;
  let hexWidthDistance = Math.sqrt(3) * hexLength;
  let hexHeightDistance = 2 * hexLength;
  let rowlengthAddition = 0;

  //Create and load a node material for the top water surface.
  let textureUrl;
  let waterMaterialTop;
  console.log("Koca: waterMaterialTop ", waterMaterialTop);

  console.log("selectSwitch", selectSwitch);

  function selectSwitch(tile) {
    console.log("tile in switch", tile);
    textureUrl = tile;
    selector = tile;

    var select = waterMaterialTop;
    currentTile = tile;

    if (tile === "delete") {
      waterMaterialTop = new BABYLON.StandardMaterial("largeGroundMat");
    } else {
      waterMaterialTop = new BABYLON.StandardMaterial("largeGroundMat");
      waterMaterialTop.diffuseTexture = new BABYLON.Texture(textureUrl);
    }
  }
  document.getElementById("desertButton").onclick = function () {
    clearAssetSelector();
    selectSwitch(tiles.desert);
  };
  document.getElementById("grassLandButton").onclick = function () {
    clearAssetSelector();
    selectSwitch(tiles.grassLand);
  };
  document.getElementById("waterButton").onclick = function () {
    clearAssetSelector();
    selectSwitch(tiles.water);
  };
  document.getElementById("streamButton").onclick = function () {
    clearAssetSelector();
    selectSwitch(tiles.stream);
  };
  document.getElementById("snowButton").onclick = function () {
    clearAssetSelector();
    selectSwitch(tiles.snow);
  };
  document.getElementById("mountainButton").onclick = function () {
    clearAssetSelector();
    assetSelector = "mountains";
  };
  document.getElementById("roadButton").onclick = function () {
    clearAssetSelector();
    selectSwitch(tiles.road);
  };
  document.getElementById("streetButton").onclick = function () {
    clearAssetSelector();
    selectSwitch(tiles.street);
  };
  document.getElementById("destroyedRoadButton").onclick = function () {
    clearAssetSelector();
    selectSwitch(tiles.destroyedRoad);
  };
  document.getElementById("rubbleButton").onclick = function () {
    clearAssetSelector();
    selectSwitch(tiles.rubble);
  };
  document.getElementById("farmButton").onclick = function () {
    clearAssetSelector();
    selectSwitch(tiles.farm);
  };
  document.getElementById("intersectionButton").onclick = function () {
    clearAssetSelector();
    selectSwitch(tiles.intersection);
  };
  document.getElementById("concreteButton").onclick = function () {
    clearAssetSelector();
    selectSwitch(tiles.concrete);
  };

  document.getElementById("concreteButton").onclick = function () {
    clearAssetSelector();
    selectSwitch(tiles.concrete);
  };

  document.getElementById("rustButton").onclick = function () {
    clearAssetSelector();
    selectSwitch(tiles.rust);
  };
  document.getElementById("dirtRoadButton").onclick = function () {
    clearAssetSelector();
    selectSwitch(tiles.dirtyRoad);
  };
  document.getElementById("suburbanRoadButton").onclick = function () {
    clearAssetSelector();
    selectSwitch(tiles.suburbanRoad);
  };
  document.getElementById("damagedRoadButton").onclick = function () {
    clearAssetSelector();
    selectSwitch(tiles.damagedRoad);
  };
  document.getElementById("cityRoadButton").onclick = function () {
    clearAssetSelector();
    selectSwitch(tiles.cityRoad);
  };
  document.getElementById("concreteTilesButton").onclick = function () {
    clearAssetSelector();
    selectSwitch(tiles.concreteTiles);
  };
  document.getElementById("concreteBricksButton").onclick = function () {
    clearAssetSelector();
    selectSwitch(tiles.concreteBricks);
  };
  document.getElementById("hedgeRowsButton").onclick = function () {
    clearAssetSelector();
    selectSwitch(tiles.hedgeRows);
  };

  document.getElementById("dryGrassButton").onclick = function () {
    clearAssetSelector();
    selectSwitch(tiles.dryGrass);
  };
  document.getElementById("dryGreenGrassButton").onclick = function () {
    clearAssetSelector();
    selectSwitch(tiles.dryGreenGrass);
  };
  document.getElementById("pebblesButton").onclick = function () {
    clearAssetSelector();
    selectSwitch(tiles.pebbles);
  };
  document.getElementById("riverButton").onclick = function () {
    clearAssetSelector();
    selectSwitch(tiles.submergedPebbles);
  };
  document.getElementById("rapidsButton").onclick = function () {
    clearAssetSelector();
    selectSwitch(tiles.rapids);
  };
  document.getElementById("rockyButton").onclick = function () {
    clearAssetSelector();
    selectSwitch(tiles.rocky);
  };
  document.getElementById("wetMudButton").onclick = function () {
    clearAssetSelector();
    selectSwitch(tiles.wetMud);
  };
  document.getElementById("mudGrassButton").onclick = function () {
    clearAssetSelector();
    selectSwitch(tiles.mudGrassMix);
  };
  document.getElementById("underGrowthButton").onclick = function () {
    clearAssetSelector();
    selectSwitch(tiles.underGrowthGreenGrass);
  };
  document.getElementById("mudButton").onclick = function () {
    clearAssetSelector();
    selectSwitch(tiles.mud);
  };
  document.getElementById("plateauButton").onclick = function () {
    clearAssetSelector();
    selectSwitch(tiles.plateau);
  };
  document.getElementById("lightSnowButton").onclick = function () {
    clearAssetSelector();
    selectSwitch(tiles.lightSnow);
  };

  document.getElementById("freewayButton").onclick = function () {
    clearAssetSelector();
    selectSwitch(tiles.freeway);
  };
  document.getElementById("cityButton").onclick = function () {
    if (currentTile) {
      selectSwitch(currentTile);
      assetSelector = "city";
    } else {
      assetSelector = "city";
    }
  };
  document.getElementById("radarButton").onclick = function () {
    if (currentTile) {
      selectSwitch(currentTile);
      assetSelector = "radar";
    } else {
      assetSelector = "radar";
    }
  };
  document.getElementById("oilRefineryButton").onclick = function () {
    if (currentTile) {
      selectSwitch(currentTile);
      assetSelector = "oil";
    } else {
      assetSelector = "oil";
    }
  };

  document.getElementById("supplyRouteButton").onclick = function () {
    if (currentTile) {
      selectSwitch(currentTile);
      assetSelector = "supplies";
    } else {
      assetSelector = "supplies";
    }
  };
  document.getElementById("militaryBaseButton").onclick = function () {
    if (currentTile) {
      selectSwitch(currentTile);
      assetSelector = "militaryBase";
    } else {
      assetSelector = "militaryBase";
    }
  };
  document.getElementById("boomBoxButton").onclick = function () {
    if (currentTile) {
      selectSwitch(currentTile);
      assetSelector = "boomBox";
    } else {
      assetSelector = "boomBox";
    }
  };

  document.getElementById("helicopterButton").onclick = function () {
    if (currentTile) {
      selectSwitch(currentTile);
      assetSelector = "helicopter";
    } else {
      assetSelector = "helicopter";
    }
  };

  document.getElementById("rotateController").onclick = function () {
    if (currentTile) {
      selectSwitch(currentTile);

      assetSelector = "rotateObj";
    } else {
      return;
    }
  };

  document.getElementById("deleteController").onclick = function () {
    if (currentTile) {
      selectSwitch("delete");
    } else {
      return;
    }
  };

  document.getElementById("navigateController").onclick = function () {
    clearAssetSelector();
    assetSelector = "navigateWorld";
  };
  // window.load;

  const selectObjectives = () => {
    document.getElementById("objectives").style.backgroundColor = "#F0E68C";

    document.getElementById("terrain").style.backgroundColor = "darkgrey";
    document.getElementById("terrain").classList.add("HoverClass1");
    document.getElementById("civilian").style.backgroundColor = "darkgrey";
    document.getElementById("civilian").classList.add("HoverClass1");
    document.getElementById("nato").style.backgroundColor = "darkgrey";
    document.getElementById("nato").classList.add("HoverClass1");
    document.getElementById("ussr").style.backgroundColor = "darkgrey";
    document.getElementById("ussr").classList.add("HoverClass1");
    document.getElementById("options").style.backgroundColor = "darkgrey";
    document.getElementById("options").classList.add("HoverClass1");

    document.getElementById("objectiveItems").style.display = "block";
    document.getElementById("civilianItems").style.display = "none";
    document.getElementById("terrainItems").style.display = "none";
    document.getElementById("natoItems").style.display = "none";
    document.getElementById("ussrItems").style.display = "none";
  };

  window.onload = selectObjectives();

  document.getElementById("objectives").onclick = function () {
    selectObjectives();
    // document.getElementById("objectives").style.backgroundColor = "#F0E68C";

    // document.getElementById("terrain").style.backgroundColor = "darkgrey";
    // document.getElementById("terrain").classList.add("HoverClass1");
    // document.getElementById("civilian").style.backgroundColor = "darkgrey";
    // document.getElementById("civilian").classList.add("HoverClass1");
    // document.getElementById("nato").style.backgroundColor = "darkgrey";
    // document.getElementById("nato").classList.add("HoverClass1");
    // document.getElementById("ussr").style.backgroundColor = "darkgrey";
    // document.getElementById("ussr").classList.add("HoverClass1");
    // document.getElementById("options").style.backgroundColor = "darkgrey";
    // document.getElementById("options").classList.add("HoverClass1");

    // document.getElementById("objectiveItems").style.display = "block";
    // document.getElementById("civilianItems").style.display = "none";
    // document.getElementById("terrainItems").style.display = "none";
    document.getElementById("natoItems").style.display = "none";
    document.getElementById("ussrItems").style.display = "none";
  };

  document.getElementById("terrain").onclick = function () {
    document.getElementById("terrain").style.backgroundColor = "#F0E68C";

    document.getElementById("objectives").style.backgroundColor = "darkgrey";
    document.getElementById("objectives").classList.add("HoverClass1");
    document.getElementById("civilian").style.backgroundColor = "darkgrey";
    document.getElementById("civilian").classList.add("HoverClass1");
    document.getElementById("nato").style.backgroundColor = "darkgrey";
    document.getElementById("nato").classList.add("HoverClass1");
    document.getElementById("ussr").style.backgroundColor = "darkgrey";
    document.getElementById("ussr").classList.add("HoverClass1");
    document.getElementById("options").style.backgroundColor = "darkgrey";
    document.getElementById("options").classList.add("HoverClass1");

    document.getElementById("terrainItems").style.display = "block";
    document.getElementById("civilianItems").style.display = "none";
    document.getElementById("objectiveItems").style.display = "none";
    document.getElementById("natoItems").style.display = "none";
    document.getElementById("ussrItems").style.display = "none";
  };

  document.getElementById("civilian").onclick = function () {
    document.getElementById("civilian").style.backgroundColor = "#F0E68C";
    document.getElementById("objectives").style.backgroundColor = "darkgrey";
    document.getElementById("objectives").classList.add("HoverClass1");
    document.getElementById("terrain").style.backgroundColor = "darkgrey";
    document.getElementById("terrain").classList.add("HoverClass1");
    document.getElementById("nato").style.backgroundColor = "darkgrey";
    document.getElementById("nato").classList.add("HoverClass1");
    document.getElementById("ussr").style.backgroundColor = "darkgrey";
    document.getElementById("ussr").classList.add("HoverClass1");
    document.getElementById("options").style.backgroundColor = "darkgrey";
    document.getElementById("options").classList.add("HoverClass1");

    document.getElementById("civilianItems").style.display = "block";
    document.getElementById("terrainItems").style.display = "none";
    document.getElementById("objectiveItems").style.display = "none";
    document.getElementById("natoItems").style.display = "none";
    document.getElementById("ussrItems").style.display = "none";
  };

  document.getElementById("nato").onclick = function () {
    document.getElementById("nato").style.backgroundColor = "#F0E68C";
    document.getElementById("objectives").style.backgroundColor = "darkgrey";
    document.getElementById("objectives").classList.add("HoverClass1");
    document.getElementById("terrain").style.backgroundColor = "darkgrey";
    document.getElementById("terrain").classList.add("HoverClass1");
    document.getElementById("civilian").style.backgroundColor = "darkgrey";
    document.getElementById("civilian").classList.add("HoverClass1");
    document.getElementById("ussr").style.backgroundColor = "darkgrey";
    document.getElementById("ussr").classList.add("HoverClass1");
    document.getElementById("options").style.backgroundColor = "darkgrey";
    document.getElementById("options").classList.add("HoverClass1");

    document.getElementById("natoItems").style.display = "block";
    document.getElementById("civilianItems").style.display = "none";
    document.getElementById("terrainItems").style.display = "none";
    document.getElementById("objectiveItems").style.display = "none";
    document.getElementById("ussrItems").style.display = "none";
  };

  document.getElementById("ussr").onclick = function () {
    document.getElementById("ussr").style.backgroundColor = "#F0E68C";
    document.getElementById("objectives").style.backgroundColor = "darkgrey";
    document.getElementById("objectives").classList.add("HoverClass1");
    document.getElementById("terrain").style.backgroundColor = "darkgrey";
    document.getElementById("terrain").classList.add("HoverClass1");
    document.getElementById("civilian").style.backgroundColor = "darkgrey";
    document.getElementById("civilian").classList.add("HoverClass1");
    document.getElementById("nato").style.backgroundColor = "darkgrey";
    document.getElementById("nato").classList.add("HoverClass1");
    document.getElementById("options").style.backgroundColor = "darkgrey";
    document.getElementById("options").classList.add("HoverClass1");

    document.getElementById("ussrItems").style.display = "block";
    document.getElementById("natoItems").style.display = "none";
    document.getElementById("civilianItems").style.display = "none";
    document.getElementById("terrainItems").style.display = "none";
    document.getElementById("objectiveItems").style.display = "none";
  };

  document.getElementById("options").onclick = function () {
    document.getElementById("options").style.backgroundColor = "#F0E68C";
    document.getElementById("objectives").style.backgroundColor = "darkgrey";
    document.getElementById("objectives").classList.add("HoverClass1");
    document.getElementById("terrain").style.backgroundColor = "darkgrey";
    document.getElementById("terrain").classList.add("HoverClass1");
    document.getElementById("civilian").style.backgroundColor = "darkgrey";
    document.getElementById("civilian").classList.add("HoverClass1");
    document.getElementById("ussr").style.backgroundColor = "darkgrey";
    document.getElementById("ussr").classList.add("HoverClass1");
    document.getElementById("nato").style.backgroundColor = "darkgrey";
    document.getElementById("nato").classList.add("HoverClass1");

    document.getElementById("civilianItems").style.display = "none";
    document.getElementById("terrainItems").style.display = "none";
    document.getElementById("natoItems").style.display = "none";
    document.getElementById("ussrItems").style.display = "none";
  };

  document.getElementById("hideShowBuilder").onclick = function () {
    const buildMenuHeight = document.getElementById("builderMenu").style.height;
    const buildMenuButtonsHeight =
      document.getElementById("builderMenuButtons").style.height;
    let HideShowButtonText =
      document.getElementById("hideShowBuilder").innerHTML;
    if (buildMenuHeight === "0px") {
      document.getElementById("hideShowBuilder").innerHTML = "⬇HIDE MENU";
      document.getElementById("hideShowBuilder").style.backgroundColor =
        "darkgrey";

      // document
      //   .getElementById("hideShowBuilder")
      //   .setAttribute("style", "color:red");
      document
        .getElementById("builderMenuButtons")
        .setAttribute("style", "bottom:210px");
      document
        .getElementById("builderMenu")
        .setAttribute("style", "height:200px");
      document
        .getElementById("controllerMenuButtons")
        .setAttribute("style", "bottom:216px");
    } else {
      document.getElementById("hideShowBuilder").innerHTML = "⬆SHOW MENU";
      document.getElementById("hideShowBuilder").style.backgroundColor =
        "#F0E68C";
      // document
      //   .getElementById("hideShowBuilder")
      //   .setAttribute("style", "color:blue");
      document
        .getElementById("builderMenuButtons")
        .setAttribute("style", "bottom:11px");
      document
        .getElementById("builderMenu")
        .setAttribute("style", "height:0px");
      document
        .getElementById("controllerMenuButtons")
        .setAttribute("style", "bottom:18px");
    }
  };

  createHexGrid(
    gridSize,
    hexWidthDistance,
    hexHeightDistance,
    rowlengthAddition,
    hexTileImport,
    selector,
    camera,
    scene
  );

  //Factor is the width and height of the texure you'd like to create, must be a factor of 2.
  let factor = 512;

  //Resolution is the number of actual grid points that you'll have. width x height. Then add 1 to make it an odd number of grid points.
  let resolution = 2 * factor + 1;
  let multiplier = 1;

  //create a flat texture for non-island tiles
  let flatArray = new Uint8Array(factor * 4);
  for (let i = 0; i < flatArray.length; i++) {
    flatArray[i] = 0;
  }
  let flatNoiseTexture = new BABYLON.RawTexture.CreateRGBTexture(
    flatArray,
    factor * 2,
    factor * 2,
    scene,
    false,
    false,
    BABYLON.Texture.NEAREST_SAMPLINGMODE
  );
  flatNoiseTexture.name = "flatNoiseTexture";

  //handling of hex tile picking
  scene.onPointerDown = function (evt, pickResult) {
    if (pickResult.pickedMesh) {
      console.log("Koca: pickResult.pickedMesh ", pickResult.pickedMesh);

      let animGroups = scene.animationGroups;
      for (let i = 0; i < animGroups.length; i++) {
        if (
          animGroups[i].targetedAnimations[0].target ===
          pickResult.pickedMesh.parent
        ) {
          let siblingMeshes = pickResult.pickedMesh.parent.getChildMeshes();
          for (let j = 0; j < siblingMeshes.length; j++) {
            if (siblingMeshes[j].name === "bottom") {
              siblingMeshes[j].material = waterMaterialTop;
              console.log("Koca: waterMaterialTop ", waterMaterialTop);

              // const test = BABYLON.SceneLoader.ImportMesh(
              //   "semi_house",
              //   "https://assets.babylonjs.com/meshes/",
              //   "both_houses_scene.babylon",
              //   scene,
              //   function (newMeshes) {
              //     // Set the target of the camera to the first imported mesh
              //     //camera.target = newMeshes[0];
              //     const b = newMeshes[0];
              //     b.absolutePosition.x =
              //       pickResult.pickedMesh.absolutePosition._x;
              //   }
              //   return scene
              // );
              console.log("Koca: assetSelector ", assetSelector);
              if (assetSelector === "box") {
                const box = BABYLON.MeshBuilder.CreateBox("box", {
                  height: 1,
                  width: 1,
                  depth: 1,
                });

                console.log("Koca: box.position ", box.position);
                box.position.x = pickResult.pickedMesh.absolutePosition._x;
                box.position.z = pickResult.pickedMesh.absolutePosition._z;
                box.position.y = 0.5;
              }

              if (assetSelector === "navigateWorld") {
                return;
              }

              if (assetSelector === "rotateObj") {
                function shuffle(array) {
                  for (var i = array.length; i > 1; i--) {
                    var r = Math.floor(Math.random() * i);
                    var temp = array[r];
                    array[r] = array[i - 1];
                    array[i - 1] = temp;
                  }
                }

                var words = ["petrol", "leaded", "rate", "crime", "behalf"];
                var nextIndex = 0;

                function chooseWord() {
                  if (nextIndex >= words.length) {
                    // make sure it doesn't get higher than the length.
                    nextIndex = 0;
                  }
                  nextIndex++;
                  return words[nextIndex - 1];
                }

                function randomNoRepeats(array) {
                  var copy = array.slice(0);
                  return function () {
                    if (copy.length < 1) {
                      copy = array.slice(0);
                    }
                    var index = Math.floor(Math.random() * copy.length);
                    var item = copy[index];
                    copy.splice(index, 1);
                    return item;
                  };
                }
                const test = randomNoRepeats([4.2, 5.24, 6.28]);
                const test2 = shuffle([4.2, 5.24, 6.28]);

                // siblingMeshes[j].material.addRotation(0.0, Math.PI / 4.0, 0.0);
                //MAGIC NUM IS 1.04
                var orientations = [4.2, 5.24, 6.28];
                var random =
                  orientations[Math.floor(Math.random() * orientations.length)];

                // var yaw = Math.random() * 6 * Math.PI;
                // console.log("Koca: yaw ", yaw);
                // console.log("Koca: ");

                console.log("pickResult.pickedMesh", pickResult.pickedMesh);
                //FOR TILES
                pickResult.pickedMesh.rotate(
                  BABYLON.Axis.Y,
                  test(),
                  // random,
                  BABYLON.Space.LOCAL
                );
                // FOR 3D OBJECTS
                // pickResult.pickedMesh._rotation._x = -20;
                // console.log("pickResult", pickResult);

                // console.log(
                //   "pickResult.pickedMesh",
                //   pickResult.pickedMesh._rotation._x
                // );
                // pickResult.pickedMesh._rotation._x += 20;
                // pickResult.pickedMesh._rotation._y = 2,

                // const Test = siblingMeshes[j].material;
                // console.log("Koca: Test ", Test);
                // console.log(
                //   "siblingMeshes[j].material.meshMap   _absoluteRotationQuaternion",
                //   siblingMeshes[j].material.meshMap[1851]
                //     ._absoluteRotationQuaternion
                // );
                // Test.meshMap[1851].rotation._x = (2 * Math.PI) / 2;
                // Test.meshMap[1851].rotation._y = 103.5;
                // Test.rotate(
                //   BABYLON.Axis.Y,
                //   (2 * Math.PI) / 2,
                //   BABYLON.Space.LOCAL
                // );

                // siblingMeshes[j].material = new BABYLON.Texture().rotate(
                //   BABYLON.Axis.Y,
                //   (2 * Math.PI) / 2,
                //   BABYLON.Space.LOCAL
                // );

                console.log(
                  "siblingMeshes[j].material: ",
                  siblingMeshes[j].material
                );
              }

              if (assetSelector === "city") {
                var skullMesh;
                BABYLON.SceneLoader.ImportMesh(
                  "",
                  "3dAssets/",
                  "city.glb",
                  scene,
                  function (newMeshes) {
                    skullMesh = newMeshes[0];
                    console.log("Koca: skullMesh.scaling ", skullMesh.scaling);
                    //POSITION
                    skullMesh.position.x =
                      pickResult.pickedMesh.absolutePosition._x;
                    skullMesh.position.z =
                      pickResult.pickedMesh.absolutePosition._z;
                    skullMesh.position.y = 0.05;
                    //SCALING
                    skullMesh.scaling.x = 0.006;
                    skullMesh.scaling.z = 0.006;
                    skullMesh.scaling.y = 0.006;
                  }
                );
              }

              if (assetSelector === "radar") {
                var skullMesh;
                BABYLON.SceneLoader.ImportMesh(
                  "",
                  "3dAssets/",
                  "radar.glb",
                  scene,
                  function (newMeshes) {
                    skullMesh = newMeshes[0];
                    console.log("Koca: skullMesh.scaling ", skullMesh.scaling);
                    //POSITION
                    skullMesh.position.x =
                      pickResult.pickedMesh.absolutePosition._x;
                    skullMesh.position.z =
                      pickResult.pickedMesh.absolutePosition._z;
                    skullMesh.position.y = 0.6;
                    //SCALING
                    skullMesh.scaling.x = 0.6;
                    skullMesh.scaling.z = 0.6;
                    skullMesh.scaling.y = 0.6;
                  }
                );
              }

              if (assetSelector === "oil") {
                var skullMesh;
                BABYLON.SceneLoader.ImportMesh(
                  "",
                  "3dAssets/",
                  "oil.glb",
                  scene,
                  function (newMeshes) {
                    skullMesh = newMeshes[0];
                    console.log("Koca: skullMesh.scaling ", skullMesh.scaling);
                    //POSITION
                    skullMesh.position.x =
                      pickResult.pickedMesh.absolutePosition._x + 0.8;
                    skullMesh.position.z =
                      pickResult.pickedMesh.absolutePosition._z;
                    skullMesh.position.y = -0.35;
                    //SCALING
                    skullMesh.scaling.x = 0.3;
                    skullMesh.scaling.z = 0.3;
                    skullMesh.scaling.y = 0.3;
                  }
                );
              }

              if (assetSelector === "supplies") {
                var skullMesh;
                BABYLON.SceneLoader.ImportMesh(
                  "",
                  "3dAssets/",
                  "supplies.glb",
                  scene,
                  function (newMeshes) {
                    skullMesh = newMeshes[0];

                    console.log("Koca: skullMesh.scaling ", skullMesh);
                    //POSITION
                    skullMesh.position.x =
                      pickResult.pickedMesh.absolutePosition._x;
                    skullMesh.position.z =
                      pickResult.pickedMesh.absolutePosition._z;
                    skullMesh.position.y = 0.05;
                    //SCALING
                    skullMesh.scaling.x = 0.0015;
                    skullMesh.scaling.z = 0.0015;
                    skullMesh.scaling.y = 0.0015;
                  }
                );
              }

              if (assetSelector === "militaryBase") {
                var skullMesh;
                BABYLON.SceneLoader.ImportMesh(
                  "",
                  "3dAssets/",
                  "base.glb",
                  scene,
                  function (newMeshes) {
                    skullMesh = newMeshes[0];
                    //POSITION
                    skullMesh.position.x =
                      pickResult.pickedMesh.absolutePosition._x;
                    skullMesh.position.z =
                      pickResult.pickedMesh.absolutePosition._z;
                    skullMesh.position.y = 0.06;
                    //SCALING
                    skullMesh.scaling.x = 0.0003;
                    skullMesh.scaling.z = 0.0003;
                    skullMesh.scaling.y = 0.0005;
                  }
                );
              }

              if (assetSelector === "boomBox") {
                console.log("IMPORT GLTF");

                var skullMesh;
                BABYLON.SceneLoader.ImportMesh(
                  "",
                  "3dAssets/",
                  "pine2.glb",
                  scene,
                  function (newMeshes) {
                    skullMesh = newMeshes[0];
                    console.log("Koca: skullMesh.scaling ", skullMesh.scaling);
                    //POSITION
                    skullMesh.position.x =
                      pickResult.pickedMesh.absolutePosition._x;
                    skullMesh.position.z =
                      pickResult.pickedMesh.absolutePosition._z;
                    skullMesh.position.y = 0.05;
                    //SCALING
                    skullMesh.scaling.x = 0.05;
                    skullMesh.scaling.z = 0.05;
                    skullMesh.scaling.y = 0.05;
                  }
                );
              }
              if (assetSelector === "mountains") {
                generateMountains(siblingMeshes);
                console.log("WE HERE?");
              }
              if (assetSelector === "helicopter") {
                console.log("helicopter wow");
                var skullMesh;
                BABYLON.SceneLoader.ImportMesh(
                  "",
                  "3dAssets/",
                  "tank.glb",
                  scene,
                  function (newMeshes) {
                    skullMesh = newMeshes[0];
                    console.log("Koca: skullMesh.scaling ", skullMesh.scaling);
                    //POSITION
                    skullMesh.position.x =
                      pickResult.pickedMesh.absolutePosition._x;
                    skullMesh.position.z =
                      pickResult.pickedMesh.absolutePosition._z;
                    skullMesh.position.y = 0.05;
                    //SCALING
                    skullMesh.scaling.x = 0.007;
                    skullMesh.scaling.z = 0.007;
                    skullMesh.scaling.y = 0.007;
                  }
                );
              }

              // BABYLON.SceneLoader.ImportMeshAsync(
              //   "semi_house",
              //   "https://assets.babylonjs.com/meshes/",
              //   "both_houses_scene.babylon"
              // );
            }
          }

          animGroups[i].play();
        }
      }

      // let noiseTexture = flatNoiseTexture;

      // //set all meshes in this hex tile to no longer be pickable
      // let siblingMeshes = pickResult.pickedMesh.parent.getChildMeshes();
      // for (let i = 0; i < siblingMeshes.length; i++) {
      //   //   siblingMeshes[i].isPickable = false;
      // }

      //randomly determine if this hex tile has an island or not and process the island components
      function generateMountains(siblingMeshes) {
        let noiseTexture = flatNoiseTexture;
        let noiseArray = diamondSquare(resolution, multiplier);

        let scaledArray = scaleNoise(noiseArray);

        //This creates a texture, pixel by pixel using the influenced random values from the noiseArray.
        noiseTexture = new BABYLON.RawTexture.CreateRGBTexture(
          scaledArray,
          factor * 2,
          factor * 2,
          scene,
          false,
          false,
          BABYLON.Texture.NEAREST_SAMPLINGMODE
        );
        noiseTexture.name = "noiseTexture";

        BABYLON.NodeMaterial.ParseFromSnippetAsync("UM4R4N#2", scene).then(
          (nodeMaterial) => {
            nodeMaterial.name =
              "terrainMaterial" +
              pickResult.pickedMesh.parent.parent.name.slice(7);
            for (let i = 0; i < siblingMeshes.length; i++) {
              if (siblingMeshes[i].name === "terrain") {
                siblingMeshes[i].visibility = 1;
                siblingMeshes[i].material = nodeMaterial;
                siblingMeshes[i].hasVertexAlpha = false;
              }
            }
            let block = nodeMaterial.getBlockByPredicate(
              (b) => b.name === "noiseTexture1"
            );
            block.texture = noiseTexture;
            block = nodeMaterial.getBlockByPredicate(
              (b) => b.name === "noiseTexture2"
            );
            block.texture = noiseTexture;
            block.texture.wAng = BABYLON.Tools.ToRadians(
              Math.min(360, Math.max(0, Math.random() * 360))
            );
            block.texture.uScale = 0.75;
            block.texture.vScale = 0.75;
          }
        );
      }
    }
  };

  // GUI
  var advancedTexture =
    BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

  var panel = new BABYLON.GUI.StackPanel();
  panel.width = "300px";
  panel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
  panel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
  advancedTexture.addControl(panel);

  let guiButton = BABYLON.GUI.Button.CreateSimpleButton(
    "guiButton",
    "Rebuild Hex Grid: Size 2"
  );
  guiButton.width = "300px";
  guiButton.height = "40px";
  guiButton.color = "white";
  guiButton.cornerRadius = 3;
  guiButton.background = "#4c4034";
  guiButton.onPointerUpObservable.add(function () {
    let sceneMeshes = scene.meshes.slice(0);
    for (let mesh of sceneMeshes) {
      mesh.dispose();
    }
    let sceneTextures = scene.textures.slice(0);
    for (let texture of sceneTextures) {
      if (texture.name === "noiseTexture") {
        texture.dispose();
      }
    }
    createHexGrid(
      gridSize,
      hexWidthDistance,
      hexHeightDistance,
      rowlengthAddition,
      hexTileImport,
      waterMaterialTop,
      camera,
      scene
    );
  });
  // SLIDER FROM DEMO
  // var slider = new BABYLON.GUI.Slider();
  // slider.minimum = 1;
  // slider.maximum = 10;
  // slider.value = 10;
  // slider.height = "20px";
  // slider.width = "200px";
  // slider.onValueChangedObservable.add(function (value) {
  //   gridSize = Math.round(value);
  //   guiButton.textBlock.text = "Rebuild Hex Grid: Size " + gridSize;
  // });
  // panel.addControl(slider);
  // panel.addControl(guiButton);

  return scene;
};

function createHexGrid(
  gridSize,
  hexWidthDistance,
  hexHeightDistance,
  rowlengthAddition,
  hexTileImport,
  waterMaterialTop,
  camera,
  scene
) {
  let gridStart = new BABYLON.Vector3(
    (hexWidthDistance / 2) * (gridSize - 1),
    0,
    -hexHeightDistance * 0.75 * (gridSize - 1)
  );
  for (let i = 0; i < gridSize * 2 - 1; i++) {
    for (let y = 0; y < gridSize + rowlengthAddition; y++) {
      let hexTile = hexTileImport.instantiateModelsToScene();
      let hexTileRoot = hexTile.rootNodes[0];
      hexTileRoot.name = "hexTile" + i + y;
      hexTileRoot.position.copyFrom(gridStart);
      hexTileRoot.position.x -= hexWidthDistance * y;

      let hexChildren = hexTileRoot.getDescendants();
      for (let k = 0; k < hexChildren.length; k++) {
        hexChildren[k].name = hexChildren[k].name.slice(9);
        if (hexChildren[k].name === "terrain") {
          hexChildren[k].visibility = 0;
        }
      }

      let hexTileChildMeshes = hexTileRoot.getChildMeshes();
      for (let j = 0; j < hexTileChildMeshes.length; j++) {
        if (hexTileChildMeshes[j].name === "top") {
          hexTileChildMeshes[j].material = waterMaterialTop;
          // BABYLON.SceneLoader.ImportMeshAsync(
          //   ["scene", "semi_house"],
          //   "https://assets.babylonjs.com/meshes/",
          //   "both_houses_scene.babylon"
          // );
          hexTileChildMeshes[j].hasVertexAlpha = false;
        }
      }

      let hexTileAnimGroup = hexTile.animationGroups[0];
      hexTileAnimGroup.name = "AnimGroup" + hexTileRoot.name;
    }

    if (i >= gridSize - 1) {
      rowlengthAddition -= 1;
      gridStart.x -= hexWidthDistance / 2;
      gridStart.z += hexHeightDistance * 0.75;
    } else {
      rowlengthAddition += 1;
      gridStart.x += hexWidthDistance / 2;
      gridStart.z += hexHeightDistance * 0.75;
    }
  }
  camera.radius = gridSize * 5;
  camera.upperRadiusLimit = camera.radius + 5;

  let allAnimGroups = scene.animationGroups;
  for (let i = 0; i < allAnimGroups.length; i++) {
    allAnimGroups[i].reset();
  }
}

//This is the main method that builds a randomly influenced noise data array by running the "diamond-square algorithm." https://en.wikipedia.org/wiki/Diamond-square_algorithm
function diamondSquare(resolution, multiplier) {
  let gridSize = resolution - 1;
  let rows = [];
  let columns = [];
  let subdivisions = 1;

  //initialize the grid
  for (let y = 0; y < resolution; y++) {
    for (let x = 0; x < resolution; x++) {
      columns[x] = 0;
    }
    rows[y] = columns;
    columns = [];
  }

  //set corner values
  rows[0][0] = Math.random() / multiplier;
  rows[0][gridSize] = Math.random() / multiplier;
  rows[gridSize][0] = Math.random() / multiplier;
  rows[gridSize][gridSize] = Math.random() / multiplier;

  let loopBreak = 0;
  while (loopBreak != 1) {
    subdivisions = subdivisions * 2;
    let distance = gridSize / subdivisions;

    //diamond step
    for (
      let rowNumber = distance;
      rowNumber < resolution;
      rowNumber += distance * 2
    ) {
      for (
        let columnNumber = distance;
        columnNumber < resolution;
        columnNumber += distance * 2
      ) {
        rows[rowNumber][columnNumber] = diamond(
          rows,
          distance,
          rowNumber,
          columnNumber,
          subdivisions,
          multiplier
        );
      }
    }

    //square step
    for (let rowNumber = 0; rowNumber < resolution; rowNumber += distance) {
      for (
        let columnNumber = 0;
        columnNumber < resolution;
        columnNumber += distance
      ) {
        if (rows[rowNumber][columnNumber] == 0) {
          rows[rowNumber][columnNumber] = square(
            rows,
            distance,
            rowNumber,
            columnNumber,
            subdivisions,
            multiplier
          );
        }
      }
    }

    loopBreak = 1;
    for (let y = 0; y < resolution; y++) {
      for (let x = 0; x < resolution; x++) {
        if (rows[y][x] == 0) {
          loopBreak = 0;
        }
      }
    }
  }
  //Create a Uint8Array, convert nested row/column array to Uint8Array, multiply by 255 for color.
  let dataArray = new Uint8Array((resolution - 1) * (resolution - 1) * 3);
  let rowCounter = 0;
  let columnCounter = 0;
  let adjustedNoiseValue = 0;
  for (let i = 0; i < dataArray.length; i += 3) {
    adjustedNoiseValue = rows[rowCounter][columnCounter] * 255;
    adjustedNoiseValue = Math.min(255, Math.max(0, adjustedNoiseValue));
    dataArray[i] = adjustedNoiseValue;
    dataArray[i + 1] = adjustedNoiseValue;
    dataArray[i + 2] = adjustedNoiseValue;
    columnCounter++;
    if (columnCounter == resolution - 1) {
      columnCounter = 0;
      rowCounter++;
    }
  }

  return dataArray;
}

function diamond(
  rows,
  distance,
  rowNumber,
  columnNumber,
  subdivisions,
  multiplier
) {
  let diamondAverageArray = [];
  if (rows[rowNumber - distance][columnNumber - distance] != null) {
    diamondAverageArray.push(
      rows[rowNumber - distance][columnNumber - distance]
    );
  }
  if (rows[rowNumber - distance][columnNumber + distance] != null) {
    diamondAverageArray.push(
      rows[rowNumber - distance][columnNumber + distance]
    );
  }
  if (rows[rowNumber + distance][columnNumber - distance] != null) {
    diamondAverageArray.push(
      rows[rowNumber + distance][columnNumber - distance]
    );
  }
  if (rows[rowNumber + distance][columnNumber + distance] != null) {
    diamondAverageArray.push(
      rows[rowNumber + distance][columnNumber + distance]
    );
  }
  let diamondValue = 0;
  for (let i = 0; i < diamondAverageArray.length; i++) {
    diamondValue += diamondAverageArray[i];
  }

  diamondValue =
    diamondValue / diamondAverageArray.length +
    (Math.random() - 0.5) / multiplier / subdivisions;

  return diamondValue;
}

function square(
  rows,
  distance,
  rowNumber,
  columnNumber,
  subdivisions,
  multiplier
) {
  let squareAverageArray = [];
  if (
    rows[rowNumber - distance] != null &&
    rows[rowNumber - distance][columnNumber] != null
  ) {
    squareAverageArray.push(rows[rowNumber - distance][columnNumber]);
  }
  if (rows[rowNumber][columnNumber + distance] != null) {
    squareAverageArray.push(rows[rowNumber][columnNumber + distance]);
  }
  if (
    rows[rowNumber + distance] != null &&
    rows[rowNumber + distance][columnNumber] != null
  ) {
    squareAverageArray.push(rows[rowNumber + distance][columnNumber]);
  }
  if (rows[rowNumber][columnNumber - distance] != null) {
    squareAverageArray.push(rows[rowNumber][columnNumber - distance]);
  }
  let squareValue = 0;
  for (let i = 0; i < squareAverageArray.length; i++) {
    squareValue += squareAverageArray[i];
  }

  squareValue =
    squareValue / squareAverageArray.length +
    (Math.random() - 0.5) / multiplier / subdivisions;

  return squareValue;
}

function scaleNoise(noiseArray) {
  //Scale the noise to always produce an island
  let max = 0;
  let min = 255;
  let desiredMin = 80;
  let desiredMax = 110;
  let scaledNoiseArray = new Uint8Array(noiseArray.length);

  for (let i = 0; i < noiseArray.length; i++) {
    if (noiseArray[i] > max) {
      max = noiseArray[i];
    }
    if (noiseArray[i] < min) {
      min = noiseArray[i];
    }
  }

  for (let i = 0; i < noiseArray.length; i++) {
    let adjustedValue =
      (desiredMax * (noiseArray[i] - min)) / (max - min) + desiredMin;
    scaledNoiseArray[i] = adjustedValue;
  }

  return scaledNoiseArray;
}
window.initFunction = async function () {
  var asyncEngineCreation = async function () {
    try {
      return createDefaultEngine();
    } catch (e) {
      console.log(
        "the available createEngine function failed. Creating the default engine instead"
      );
      return createDefaultEngine();
    }
  };

  window.engine = await asyncEngineCreation();
  if (!engine) throw "engine should not be null.";
  window.scene = createScene();
};
initFunction().then(() => {
  scene.then((returnedScene) => {
    sceneToRender = returnedScene;
  });

  engine.runRenderLoop(function () {
    if (sceneToRender && sceneToRender.activeCamera) {
      sceneToRender.render();
    }
  });
});

// Resize
window.addEventListener("resize", function () {
  engine.resize();
});
