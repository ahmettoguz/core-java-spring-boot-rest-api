import Constant from "src/constant/Constant";
import CommonUtil from "src/util/CommonUtil";
import CoreEntityService from "./core/CoreEntityService";

class DomainService extends CoreEntityService {
  constructor() {
    super("domains");
  }

  async getDefaultCreateData() {
    return {
      name: `${Constant.preKey}${CommonUtil.generateRandomWord()}`,
      isActive: true,
    };
  }
}

export default DomainService;
