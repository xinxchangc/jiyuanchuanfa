(function () {
  const valveFeatures = ["船用管路常用阀件", "可按口径、压力、连接方式确认", "适合新船配套、维修替换和批量采购"];
  const accessoryFeatures = ["船舶管路及机舱附件", "可按尺寸、材质、接口形式确认", "支持来样、来图和项目配套沟通"];

  const valveDetail =
    "该产品适用于船舶管路系统的启闭、调节、止回或保护。询价时建议提供使用介质、工作压力、公称通径、连接方式、数量及是否有图纸，便于快速确认型号和报价。";
  const accessoryDetail =
    "该产品适用于船舶机舱、甲板、通风、排水、过滤或管路连接等配套场景。可结合现场安装尺寸、接口形式、材质要求和样品图纸进行确认。";

  const rawProducts = [
    ["p02-01-hydraulic-hydraulic.jpg", "青铜阀门", "青铜截止阀", "海水、油水、机舱及船舶常用管路", "规格选型 / 维修替换 / 批量供货"],
    ["p02-02-hydraulic-hydraulic-hydraulic.jpg", "青铜阀门", "法兰青铜闸阀", "海水、油水、机舱及船舶常用管路", "规格选型 / 维修替换 / 批量供货"],
    ["p02-03-hydraulic-hydraulic-hydraulic.jpg", "青铜阀门", "法兰青铜截止阀", "海水、油水、机舱及船舶常用管路", "规格选型 / 维修替换 / 批量供货"],
    ["p02-04-hydraulic-hydraulic.jpg", "青铜阀门", "气动快关阀", "船舶油舱、燃油管路和需要快速切断的管路", "驱动方式确认 / 项目配套"],
    ["p02-05-hydraulic-hydraulic-hydraulic-hydraulic.jpg", "青铜阀门", "外螺纹青铜截止阀", "小口径船用管路、设备接口和维修替换", "规格选型 / 现货沟通"],
    ["p02-06-hydraulic-hydraulic-hydraulic.jpg", "青铜阀门", "法兰青铜节流阀", "需要流量调节的船用管路", "口径压力确认 / 批量供货"],
    ["p02-07-hydraulic-hydraulic-hydraulic-hydraulic.jpg", "青铜阀门", "法兰青铜填料旋塞", "船舶管路启闭、排放和切换", "规格选型 / 维修替换"],
    ["p02-08-hydraulic-hydraulic.jpg", "青铜阀门", "青铜消火栓", "船舶消防管路和甲板消防系统", "消防配套 / 批量供货"],
    ["p02-09-hydraulic-hydraulic-hydraulic.jpg", "青铜阀门", "内螺纹青铜闸阀", "小口径管路启闭控制", "规格选型 / 维修替换"],
    ["p02-10-hydraulic-hydraulic.jpg", "青铜阀门", "水减压阀", "船舶水系统压力调节", "压力范围确认 / 规格选型"],
    ["p02-11-hydraulic-hydraulic.jpg", "青铜阀门", "空气减压阀", "压缩空气管路压力调节", "压力范围确认 / 项目配套"],
    ["p02-12-hydraulic-hydraulic-hydraulic-hydraulic.jpg", "青铜阀门", "内螺纹青铜截止阀", "小口径水、油、气管路启闭", "规格选型 / 维修替换"],
    ["p02-13-hydraulic-hydraulic-hydraulic.jpg", "青铜阀门", "法兰青铜止回阀", "防止介质倒流的船用管路", "规格选型 / 批量供货"],
    ["p02-14-hydraulic-hydraulic-hydraulic.jpg", "青铜阀门", "法兰青铜闸阀", "船舶常用水、油管路启闭", "规格选型 / 批量供货"],
    ["p02-15-hydraulic-hydraulic-hydraulic-hydraulic.jpg", "青铜阀门", "外螺纹青铜填料旋塞", "小口径管路切换、启闭和排放", "规格选型 / 维修替换"],
    ["p02-16-hydraulic-hydraulic.jpg", "青铜阀门", "软管接头阀", "软管连接和船舶辅助管路", "接口确认 / 配套供应"],
    ["p02-17-hydraulic-hydraulic.jpg", "青铜阀门", "竖式止回阀", "空间受限的防倒流管路", "安装方式确认 / 规格选型"],
    ["p02-18-hydraulic-hydraulic-hydraulic-hydraulic-hydraulic.jpg", "青铜阀门", "外螺纹液体直角安全阀", "液体管路超压保护", "压力等级确认 / 安全阀选型"],
    ["p02-19-b-hydraulic-hydraulic.jpg", "青铜阀门", "B型压力表阀", "压力表接口和检测管路", "接口规格确认 / 配套供应"],
    ["p02-20-hydraulic-hydraulic.jpg", "青铜阀门", "测深自闭阀", "船舶测深系统和舱柜管路", "图纸确认 / 维修替换"],
    ["p02-21-hydraulic-hydraulic-hydraulic.jpg", "青铜阀门", "旋启式止回阀", "船舶管路止回保护", "规格选型 / 批量供货"],
    ["p02-22-hydraulic-hydraulic-hydraulic-hydraulic.jpg", "青铜阀门", "青铜自闭式放泄阀", "舱柜、管路放泄和排放", "规格选型 / 项目配套"],
    ["p02-23-hydraulic-hydraulic.jpg", "青铜阀门", "板式止回阀", "船舶管路防倒流", "规格选型 / 维修替换"],
    ["p02-24-hydraulic-hydraulic-hydraulic-hydraulic.jpg", "青铜阀门", "外螺纹青铜截止阀", "小口径管路启闭和维修替换", "规格选型 / 现货沟通"],

    ["p03-01-hydraulic-hydraulic.jpg", "铸钢阀门", "铸钢截止阀", "高强度船用管路、蒸汽及油水系统", "图纸确认 / 参数选型 / 项目配套"],
    ["p03-02-hydraulic-hydraulic-hydraulic.jpg", "铸钢阀门", "铸钢截止止回阀", "兼具启闭和止回要求的船用管路", "图纸确认 / 参数选型"],
    ["p03-03-hydraulic-hydraulic.jpg", "铸钢阀门", "铸钢闸阀", "大流量管路启闭控制", "口径压力确认 / 项目配套"],
    ["p03-04-hydraulic-hydraulic-hydraulic.jpg", "铸钢阀门", "自闭式快关阀", "需要快速切断的船舶油水管路", "安全控制方案确认 / 项目配套"],
    ["p03-05-hydraulic-hydraulic.jpg", "铸钢阀门", "铸钢滤器", "船舶管路过滤和设备保护", "滤网规格确认 / 批量供货"],
    ["p03-06-hydraulic-hydraulic.jpg", "铸铁阀门", "铸铁闸阀", "船舶水系统和常规管路启闭", "规格选型 / 批量供货"],
    ["p03-07-hydraulic-hydraulic.jpg", "铸铁阀门", "铸铁截止阀", "船舶水、油管路启闭", "规格选型 / 维修替换"],
    ["p03-08-hydraulic-hydraulic-hydraulic.jpg", "铸铁阀门", "应急消防安全阀", "消防及应急保护管路", "压力等级确认 / 项目配套"],
    ["p03-09-hydraulic-hydraulic.jpg", "铸铁阀门", "电动止回阀", "需要电动控制和止回保护的管路", "控制方式确认 / 项目配套"],
    ["p03-10-hydraulic-hydraulic-hydraulic.jpg", "铸铁阀门", "法兰铸铁闸阀", "船舶常用法兰连接管路", "口径压力确认 / 批量供货"],
    ["p03-11-hydraulic-hydraulic.jpg", "铸铁阀门", "油轮闸阀", "油轮相关管路启闭控制", "图纸确认 / 项目配套"],
    ["p03-12-hydraulic-hydraulic-hydraulic.jpg", "铸铁阀门", "法兰铸铁截止阀", "船舶水、油管路启闭", "规格选型 / 维修替换"],
    ["p03-13-hydraulic-hydraulic.jpg", "铸铁阀门", "油轮呼吸阀", "油舱和油轮透气保护", "工况确认 / 项目配套"],
    ["p03-14-hydraulic-hydraulic.jpg", "阀组", "吸入阀组", "泵组、吸入管路和成套控制系统", "成套配套 / 图纸确认"],
    ["p03-15-hydraulic-hydraulic-hydraulic.jpg", "阀组", "空气减压阀组", "压缩空气系统和减压控制", "成套配套 / 压力范围确认"],

    ["p04-b01-hydraulic-hydraulic.jpg", "蝶阀系列", "手动蝶阀", "大口径水系统、通风和一般管路", "驱动方式确认 / 规格选型"],
    ["p04-b02-hydraulic-hydraulic-hydraulic.jpg", "蝶阀系列", "外螺纹青铜蝶阀", "螺纹连接管路和小型设备接口", "接口确认 / 维修替换"],
    ["p04-b03-hydraulic-hydraulic-hydraulic-hydraulic-hydraulic.jpg", "蝶阀系列", "中心型蝶阀电子式驱动阀", "需要电动控制的船舶管路", "控制方式确认 / 项目配套"],
    ["p04-b04-hydraulic-hydraulic-hydraulic-hydraulic-hydraulic-hydraulic.jpg", "蝶阀系列", "双偏心法兰伸缩式手动蝶阀", "大口径管路、伸缩补偿和手动启闭", "结构尺寸确认 / 项目配套"],
    ["p04-b05-hydraulic-hydraulic.jpg", "蝶阀系列", "气动蝶阀", "需要气动控制的船舶管路", "气源和控制方式确认 / 成套供应"],
    ["p04-b06-hydraulic-hydraulic-hydraulic-hydraulic.jpg", "蝶阀系列", "中心型双法兰蝶阀", "法兰连接大口径管路", "口径压力确认 / 批量供货"],
    ["p04-b07-hydraulic-hydraulic-hydraulic-hydraulic-hydraulic-hydraulic-hydraulic.jpg", "蝶阀系列", "双偏心法兰蝶阀长轴传动手动蝶阀", "远距离手动操作和大口径管路", "传动结构确认 / 项目配套"],
    ["p04-b08-hydraulic-hydraulic.jpg", "蝶阀系列", "蜗轮式蝶阀", "需要省力操作的大口径管路", "驱动方式确认 / 规格选型"],
    ["p04-b09-hydraulic-hydraulic-hydraulic.jpg", "蝶阀系列", "液压遥控蝶阀", "需要液压远程控制的船舶管路", "液压控制方案确认 / 项目配套"],
    ["p04-pump-hydraulic-hydraulic.jpg", "蝶阀系列", "手动液压泵", "液压控制和船舶附件配套", "规格确认 / 配套供应"],

    ["p04-s01-hydraulic-hydraulic-hydraulic-hydraulic.jpg", "不锈钢阀门", "不锈钢蝶式止回阀", "耐腐蚀管路和防倒流系统", "材质确认 / 规格选型"],
    ["p04-s02-hydraulic-hydraulic-hydraulic.jpg", "不锈钢阀门", "不锈钢截止阀", "耐腐蚀介质管路启闭", "材质确认 / 维修替换"],
    ["p04-s03-hydraulic-hydraulic-hydraulic.jpg", "不锈钢阀门", "不锈钢三通球阀", "介质切换和分流管路", "接口确认 / 规格选型"],
    ["p04-s04-hydraulic-hydraulic.jpg", "不锈钢阀门", "不锈钢球阀", "耐腐蚀管路快速启闭", "材质确认 / 批量供货"],
    ["p04-s05-hydraulic-hydraulic-hydraulic-hydraulic.jpg", "不锈钢阀门", "不锈钢截止止回阀", "兼具启闭和止回要求的耐腐蚀管路", "材质确认 / 项目配套"],
    ["p04-s06-hydraulic-hydraulic-hydraulic-hydraulic.jpg", "不锈钢阀门", "不锈钢针型截止阀", "仪表、取样和小流量调节管路", "接口确认 / 维修替换"],
    ["p04-s07-hydraulic-hydraulic-hydraulic-hydraulic.jpg", "不锈钢阀门", "不锈钢伸缩安全阀", "耐腐蚀管路安全保护", "压力等级确认 / 安全阀选型"],
    ["p04-s08-hydraulic-y-hydraulic.jpg", "不锈钢阀门", "不锈钢Y型滤器", "耐腐蚀管路过滤和设备保护", "滤网规格确认 / 批量供货"],
    ["p04-s09-hydraulic-hydraulic-hydraulic-hydraulic-hydraulic.jpg", "不锈钢阀门", "不锈钢高压针型截止阀", "高压小流量控制和仪表管路", "压力等级确认 / 规格选型"],
    ["p04-aircap-hydraulic-hydraulic-hydraulic.jpg", "船用附件", "不锈钢空气帽", "空气管路、甲板通风和船舶附件配套", "规格确认 / 配套供应"],

    ["p05-101-hydraulic-hydraulic.jpg", "船用滤器", "粗油滤器", "燃油、滑油等油路过滤", "滤网规格确认 / 维修替换"],
    ["p05-102-hydraulic-hydraulic.jpg", "船用滤器", "单联油滤器", "船舶油路过滤和设备保护", "滤网规格确认 / 批量供货"],
    ["p05-103-hydraulic-hydraulic-hydraulic.jpg", "船用滤器", "青铜粗油滤器", "油路粗过滤和船舶机舱配套", "材质确认 / 规格选型"],
    ["p05-104-hydraulic-hydraulic.jpg", "船用滤器", "单联油滤器", "油路过滤和维修替换", "滤网规格确认 / 现货沟通"],
    ["p05-105-hydraulic-hydraulic.jpg", "船用滤器", "双联油滤器", "连续运行油路过滤系统", "切换方式确认 / 项目配套"],
    ["p05-106-hydraulic-hydraulic-hydraulic.jpg", "船用滤器", "钢制单联油滤器", "油路过滤和船舶机舱配套", "材质规格确认 / 批量供货"],
    ["p05-107-hydraulic-hydraulic.jpg", "船用滤器", "粗水滤器", "海水、淡水管路过滤", "滤网规格确认 / 维修替换"],
    ["p05-108-hydraulic-hydraulic.jpg", "船用附件", "空气管头", "船舶空气管路和甲板通风", "规格确认 / 项目配套"],
    ["p05-109-hydraulic-hydraulic.jpg", "船用附件", "空气管头", "空气管路和透气系统", "规格确认 / 批量供货"],
    ["p05-110-hydraulic-hydraulic.jpg", "船用附件", "青铜吸入口", "舱底水、海水和管路吸入口", "接口尺寸确认 / 维修替换"],
    ["p05-111-hydraulic.jpg", "船用附件", "泥箱", "船舶排水、过滤和沉淀配套", "尺寸确认 / 项目配套"],
    ["p05-112-hydraulic-hydraulic-hydraulic.jpg", "船用附件", "船用消防接头", "消防管路和甲板消防配套", "接口规格确认 / 批量供货"],
    ["p05-201-hydraulic-hydraulic.jpg", "船用附件", "汽水分离器", "蒸汽、空气或管路分离配套", "工况确认 / 规格选型"],
    ["p05-202-hydraulic-hydraulic-hydraulic-hydraulic.jpg", "船用附件", "不锈钢波纹膨胀节", "管路热胀冷缩补偿和振动吸收", "尺寸材质确认 / 项目配套"],
    ["p05-203-hydraulic-hydraulic-hydraulic.jpg", "船用附件", "金属波纹膨胀节", "管路补偿、减振和连接", "尺寸材质确认 / 项目配套"],
    ["p05-204-hydraulic.jpg", "船用附件", "法兰", "船舶管路连接和设备接口", "标准规格确认 / 批量供货"],
    ["p05-205-hydraulic-hydraulic-hydraulic.jpg", "船用附件", "橡胶膨胀接头", "管路减振、补偿和柔性连接", "尺寸材质确认 / 项目配套"],
    ["p05-206-hydraulic-hydraulic-hydraulic.jpg", "船用附件", "丁腈橡胶膨胀节", "油水管路柔性连接和减振", "材质工况确认 / 规格选型"],
    ["p05-207-hydraulic-hydraulic.jpg", "船用附件", "圆形通风头", "船舶通风和甲板附件", "尺寸确认 / 项目配套"],
    ["p05-208-hydraulic-hydraulic-hydraulic.jpg", "船用附件", "小舱角阀装置", "舱室管路和附件配套", "图纸确认 / 维修替换"],
    ["p05-209-hydraulic-hydraulic.jpg", "船用附件", "铜吸入口", "船舶水系统吸入口和管路附件", "接口规格确认 / 批量供货"],
    ["p05-210-hydraulic-hydraulic.jpg", "船用附件", "油舱空气帽", "油舱透气和空气管路保护", "规格确认 / 项目配套"],
    ["p05-211-hydraulic-hydraulic-hydraulic.jpg", "船用附件", "油舱应急透气头", "油舱应急透气和安全保护", "工况确认 / 项目配套"],
    ["p05-212-hydraulic-hydraulic-hydraulic.jpg", "船用附件", "甲板漏水装置", "甲板排水和船体附件配套", "尺寸确认 / 批量供货"]
  ];

  const products = rawProducts.map(([file, category, title, scene, service], index) => {
    const isAccessory = category.includes("附件") || category.includes("滤器");
    return {
      id: `product-${String(index + 1).padStart(2, "0")}`,
      code: String(index + 1).padStart(2, "0"),
      category,
      title,
      summary: `${title}，适用于${scene}。`,
      scene,
      service,
      image: `assets/products/${file}`,
      features: isAccessory ? accessoryFeatures : valveFeatures,
      detail: isAccessory ? accessoryDetail : valveDetail
    };
  });

  window.SITE_DATA = {
    company: {
      name: "泰州市吉远船用附件有限公司",
      shortName: "吉远船阀",
      tagline: "船用附件 · 船用阀门 · 通用机械制造",
      headline: "船用阀门与附件产品配套",
      summary: "专注船用阀门与船用附件配套，产品覆盖青铜阀门、铸钢阀门、铸铁阀门、不锈钢阀门、蝶阀、阀组、船用滤器及管路附件。",
      about:
        "泰州市吉远船用附件有限公司位于江苏泰州，长期面向船舶配套、船舶维修、机舱管路和通用机械制造场景，提供船用阀门、船用附件及相关机械产品。公司以产品适配、规格确认和稳定交付为服务重点，支持客户按产品册、图纸、样品或现场工况进行选型沟通。",
      aboutExtra:
        "产品方向涵盖青铜、铸钢、铸铁、不锈钢等材质阀门，以及蝶阀、阀组、滤器、膨胀节、空气帽、法兰、吸入口、泥箱、消防接头等船用附件。客户可提供使用介质、公称通径、压力等级、连接方式和数量，便于快速确认规格与报价。",
      founded: "2014年03月10日",
      region: "江苏泰州",
      contactPerson: "王俊",
      address: "泰州市海陵区苏陈镇西石羊村十三组",
      phones: ["13914400275"]
    },
    products
  };
})();
