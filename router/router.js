const router = require("express").Router();

const KrsController = require("../controller/krs-controller");
const MahasiswaController = require("../controller/mahasiswa-controller");
const MatakuliahController = require("../controller/matakuliah-controller");

const krsPostValidator = require("../validator/krs-post-validator");
const makulPostValidator = require("../validator/makul-post-validator");
const mhsPostValidator = require("../validator/mhs-post-validator");

router.get("/mhs", MahasiswaController.index);
router.delete("/mhs/(:id)", MahasiswaController.delete);
router.get("/mhs/(:id)", MahasiswaController.show);
router.post("/mhs", mhsPostValidator, MahasiswaController.store);
router.put("/mhs/(:id)", mhsPostValidator, MahasiswaController.update);

router.get("/makul", MatakuliahController.index);
router.get("/makul/(:id)", MatakuliahController.show);
router.post("/makul", makulPostValidator, MatakuliahController.store);
router.put("/makul/(:id)", makulPostValidator, MatakuliahController.update);
router.delete("/makul/(:id)", MatakuliahController.delete);

router.get("/krs", KrsController.index);
router.post("/krs", krsPostValidator, KrsController.store);
router.get("/krs/(:npm)", KrsController.show);
router.put("/krs/(:npm)/(:id)", KrsController.update);
router.delete("/krs/(:npm)/(:id)", KrsController.delete);

module.exports = router;
