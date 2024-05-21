const router = require("express").Router();
const KrsController = require("../controller/krs-controller");
const MahasiswaController = require("../controller/mahasiswa-controller");
const MatakuliahController = require("../controller/matakuliah-controller");
const krsPostValidator = require("../validator/krs-post-validator");
const makulPostValidator = require("../validator/makul-post-validator");

const mhsPostValidator = require("../validator/mhs-post-validator");

router.get("/mhs", MahasiswaController.index);
router.get("/mhs/(:id)", MahasiswaController.show);
router.post("/mhs", mhsPostValidator, MahasiswaController.store);

router.get("/makul", MatakuliahController.index);
router.get("/makul/(:id)", MatakuliahController.show);
router.post("/makul", makulPostValidator, MatakuliahController.store);

router.get("/krs", KrsController.index);
router.post("/krs", KrsController.store);
router.get("/krs/(:id)", KrsController.show);
router.get("/krs-mhs", KrsController.allKrsMhs);
router.get("/krs-mhs/(:npm)", krsPostValidator, KrsController.krsMhs);

module.exports = router;
