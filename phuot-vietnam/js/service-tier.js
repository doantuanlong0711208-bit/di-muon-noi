/**
 * ============================================================================
 * KIẾN TRÚC ĐA TẦNG (3-TIER ARCHITECTURE) — TẦNG DỊCH VỤ & DỮ LIỆU
 * - Tier 1 (Presentation): index.html, css/style.css, js/app.js, js/map.js
 * - Tier 2 (Business Logic & API Service): js/service-tier.js + server.js
 * - Tier 3 (Data Persistence): LocalDatabase (LocalStorage/JSON) + Seed Data
 * ============================================================================
 */

const REGION_METADATA = {
  "Miền Bắc": {
    id: "mien-bac",
    code: "NORTH · HIGHLANDS",
    title: "Miền Bắc — Đỉnh Đèo & Mây Ngàn",
    tagline: "Hà Giang · Tây Bắc · Đông Bắc",
    description: "Vùng đất của Tứ Đại Đỉnh Đèo, những hẻm vực đá tai mèo sâu thẳm, ruộng bậc thang mùa lúa chín và biển mây Tà Xùa.",
    elevationPeak: "2.000m+",
    terrainType: "Đèo cao & Cua tay áo",
    accentColor: "#146338",
    icon: "🏔️"
  },
  "Miền Trung": {
    id: "mien-trung",
    code: "CENTRAL · COASTAL",
    title: "Miền Trung — Duyên Hải & Trường Sơn",
    tagline: "Hải Vân · Bình Tiên · Đường Hồ Chí Minh",
    description: "Sự giao thoa kỳ vĩ giữa một bên là vách núi Trường Sơn dựng đứng, một bên là đại dương xanh ngọc bích đẹp nhất Việt Nam.",
    elevationPeak: "1.200m",
    terrainType: "Đường ven biển & Đèo rừng",
    accentColor: "#1D4ED8",
    icon: "🌊"
  },
  "Tây Nguyên & Nam Bộ": {
    id: "tay-nguyen-nam-bo",
    code: "HIGHLANDS & DELTA",
    title: "Tây Nguyên & Nam Bộ — Đại Ngàn & Phù Sa",
    tagline: "Đà Lạt · Măng Đen · Thất Sơn · Cà Mau",
    description: "Hành trình xuyên qua những rừng thông sương mù, đồi cà phê bạt ngàn trên đất đỏ bazan đến miền sông nước Cửu Long.",
    elevationPeak: "1.500m",
    terrainType: "Đèo thông & Đường ven sông",
    accentColor: "#D97706",
    icon: "🌲"
  },
  "Bộ Sưu Tập Tứ Đại": {
    id: "bo-tu-dai",
    code: "GRAND SLAM · 4 EXTREMES",
    title: "Bộ Tứ Đại — 4 Cực & Đỉnh Đèo Huyền Thoại",
    tagline: "Lũng Cú · A Pa Chải · Mũi Đôi · Cà Mau",
    description: "Bộ sưu tập danh giá nhất dành cho các phượt thủ muốn chinh phục trọn vẹn 4 cực Tổ quốc và 4 đỉnh đèo huyền thoại.",
    elevationPeak: "2.200m",
    terrainType: "Hành trình Chinh phục Cực điểm",
    accentColor: "#B45309",
    icon: "🏆"
  }
};

// Hồ sơ mẫu để Đăng nhập nhanh 1 chạm (Demo 1-Click Login)
const DEMO_PASSPORT_PROFILES = [
  {
    id: "user_hoang_minh",
    name: "Hoàng Minh",
    city: "Hà Nội",
    vehicle: "Xe côn tay CB500X",
    avatar: "🏍️",
    rankTitle: "Huyền Thoại Xuyên Việt",
    verified: true,
    conqueredRoutes: [
      "ha-giang-loop",
      "tu-dai-dinh-deo-tay-bac",
      "san-may-ta-xua-tram-tau",
      "dong-bac-cao-bang-ban-gioc",
      "cuc-bac-lung-cu",
      "deo-hai-van-hue-da-nang",
      "ven-bien-binh-thuan-ninh-thuan"
    ]
  },
  {
    id: "user_linh_dan",
    name: "Linh Đan",
    city: "Đà Nẵng",
    vehicle: "Xe số Yamaha PG-1",
    avatar: "🧭",
    rankTitle: "Phượt Thủ Bản Lĩnh",
    verified: true,
    conqueredRoutes: [
      "deo-hai-van-hue-da-nang",
      "ban-dao-son-tra-dinh-ban-co",
      "quy-nhon-eo-gio-ghenh-da-dia",
      "duong-truong-son-dong"
    ]
  },
  {
    id: "user_tuan_kiet",
    name: "Tuấn Kiệt",
    city: "TP. Hồ Chí Minh",
    vehicle: "Ô tô SUV 4x4",
    avatar: "🚙",
    rankTitle: "Tay Lái Đại Ngàn",
    verified: true,
    conqueredRoutes: [
      "deo-ngoan-muc-cau-dat-da-lat",
      "ho-ta-dung-dak-nong-bao-loc",
      "ven-bien-vung-tau-ho-tram-ke-ga",
      "vong-cung-that-son-bay-nui-an-giang",
      "cung-duong-cuc-nam-tay-nam-bo"
    ]
  }
];

const SEED_REVIEWS = {
  "ha-giang-loop": [
    {
      id: "rev_hg_1",
      author: "Hoàng Minh (Hà Nội)",
      rank: "Huyền Thoại Xuyên Việt",
      vehicle: "Xe côn tay CB500X",
      rating: 5,
      topic: "⚠️ Kinh nghiệm đường đèo",
      date: "2 giờ trước",
      likes: 28,
      note: "Đoạn từ Đồng Văn sang Mã Pí Lèng mặt đường mới trải nhựa lại rất êm. Các bạn nhớ ghé dốc Thẩm Mã lúc 7h30 sáng nắng xiên qua khe núi chụp ảnh cực đẹp, tránh chạy đèo sau 17h30 vì sương xuống nhanh."
    },
    {
      id: "rev_hg_2",
      author: "Thanh Thảo (Sài Gòn)",
      rank: "Phượt Thủ Bản Lĩnh",
      vehicle: "Xe số Wave Alpha",
      rating: 5,
      topic: "🍜 Ẩm thực & Trạm xăng",
      date: "Hôm qua",
      likes: 19,
      note: "Nhớ đổ đầy bình xăng ở Quản Bạ và Yên Minh. Tối ở phố cổ Đồng Văn nên thử lẩu gà đen và bánh cuốn trứng nóng gần chợ cổ, giá rất hợp lý!"
    }
  ],
  "san-may-ta-xua-tram-tau": [
    {
      id: "rev_tx_1",
      author: "Đức Anh (CLB Motor Tây Bắc)",
      rank: "Huyền Thoại Xuyên Việt",
      vehicle: "Honda Winner X",
      rating: 5,
      topic: "📸 Điểm săn mây",
      date: "3 giờ trước",
      likes: 34,
      note: "Biển mây ở Sống lưng khủng long Háng Đồng dày đặc từ 5h30 đến 8h sáng. Đoạn nối Xím Vàng sang Trạm Tấu có vài khúc đá hộc, chỉ nên đi xe số hoặc côn tay khi trời khô ráo."
    }
  ],
  "ven-bien-binh-thuan-ninh-thuan": [
    {
      id: "rev_vh_1",
      author: "Linh Đan (Đà Nẵng)",
      rank: "Phượt Thủ Bản Lĩnh",
      vehicle: "Xe số Yamaha PG-1",
      rating: 5,
      topic: "📸 Điểm ngắm cảnh",
      date: "Hôm qua",
      likes: 22,
      note: "Nước biển Vĩnh Hy trong vắt nhìn thấy đáy! Cung đường DT702 gió biển khá mạnh ở các khúc cua trên cao, mọi người dừng chụp ảnh nhớ đỗ sát vào các vịnh ngắm cảnh có lan can nhé."
    }
  ]
};

const SEED_CHAT_MESSAGES = {
  "toan-quoc": [
    {
      id: "msg_1",
      author: "Hoàng Minh (Hà Nội)",
      rank: "Huyền Thoại Xuyên Việt",
      avatar: "🏍️",
      tag: "⚠️ Cảnh báo đèo",
      routeId: "ha-giang-loop",
      routeName: "Vòng Cung Hà Giang",
      time: "10 phút trước",
      likes: 14,
      text: "Sáng nay đoàn mình vừa qua đèo Mã Pí Lèng, trời nắng ráo trong vắt, sông Nho Quế xanh ngắt. Anh em nào đang ở Đồng Văn lên đèo tầm này là đẹp nhất trong ngày nhé!"
    },
    {
      id: "msg_2",
      author: "Linh Đan (Đà Nẵng)",
      rank: "Phượt Thủ Bản Lĩnh",
      avatar: "🧭",
      tag: "🍜 Quán ngon bản địa",
      routeId: "duong-truong-son-dong",
      routeName: "Đường Trường Sơn Đông — Măng Đen",
      time: "28 phút trước",
      likes: 9,
      text: "Lên Măng Đen mùa này lạnh 15 độ phê lắm mọi người ơi. Nhớ ghé ăn gà nướng cơm lam Cô Sinh rồi chạy dọc đường thông buổi sớm, sương giăng như phim điện ảnh!"
    },
    {
      id: "msg_3",
      author: "Tuấn Kiệt (TP. Hồ Chí Minh)",
      rank: "Tay Lái Đại Ngàn",
      avatar: "🚙",
      tag: "📸 Góc chụp đẹp",
      routeId: "deo-ngoan-muc-cau-dat-da-lat",
      routeName: "Đèo Ngoạn Mục — Cầu Đất",
      time: "1 giờ trước",
      likes: 18,
      text: "Đồi chè Cầu Đất sáng nay biển mây tràn qua các trụ điện gió đẹp xuất sắc. Đường từ Phan Rang lên Đèo Ngoạn Mục mặt đường tốt, nhưng cua gắt nên anh em giữ số thấp đều ga nhé."
    }
  ],
  "deo-phia-bac": [
    {
      id: "msg_b1",
      author: "Đức Anh (Yên Bái)",
      rank: "Huyền Thoại Xuyên Việt",
      avatar: "🏔️",
      tag: "⚠️ Cảnh báo đèo",
      routeId: "san-may-ta-xua-tram-tau",
      routeName: "Săn Mây Tà Xùa — Trạm Tấu",
      time: "15 phút trước",
      likes: 21,
      text: "Cập nhật trực tiếp từ đỉnh Tà Xùa: Lặng gió, mây đang ứ đầy thung lũng Háng Đồng. Nhiệt độ sáng sớm khoảng 11°C, anh em nhớ mang găng tay chống nước và dán kính vàng đèn pha!"
    },
    {
      id: "msg_b2",
      author: "Hải Yến (Quảng Ninh)",
      rank: "Phượt Thủ Bản Lĩnh",
      avatar: "🌾",
      tag: "📸 Góc chụp đẹp",
      routeId: "vong-cung-bien-gioi-binh-lieu",
      routeName: "Vòng Cung Biên Giới Bình Liêu",
      time: "45 phút trước",
      likes: 15,
      text: "Đường tuần tra biên giới từ mốc 1297 sang mốc 1305 cỏ lau đang nở trắng xóa cả sống núi. Nắng chiều lúc 15h30–17h00 chiếu ngược qua bông lau đẹp mê hồn!"
    }
  ],
  "bien-trung-tay-nguyen": [
    {
      id: "msg_t1",
      author: "Minh Quân (Nha Trang)",
      rank: "Tay Lái Đại Ngàn",
      avatar: "🌊",
      tag: "🍜 Quán ngon bản địa",
      routeId: "ven-bien-binh-thuan-ninh-thuan",
      routeName: "Cung Biển Bình Thuận — Ninh Thuận",
      time: "20 phút trước",
      likes: 12,
      text: "Chạy cung Bàu Trắng – Mũi Dinh – Vĩnh Hy tầm 7h–10h sáng nắng lên màu nước biển 3 tầng xanh đẹp điên đảo. Tới Vĩnh Hy nhớ ăn bún chả cá và bánh căn mực tươi ngay cảng nhé!"
    },
    {
      id: "msg_t2",
      author: "Bảo Ngọc (Đà Lạt)",
      rank: "Phượt Thủ Bản Lĩnh",
      avatar: "🌲",
      tag: "⚠️ Cảnh báo đèo",
      routeId: "nha-trang-deo-khanh-le-da-lat",
      routeName: "Nha Trang — Đèo Khánh Lê — Đà Lạt",
      time: "1 giờ trước",
      likes: 16,
      text: "Đỉnh đèo Khánh Lê tầm sau 15h chiều hay có sương mù dày ở đoạn Km42–Km50, anh em từ Nha Trang lên Đà Lạt nhớ xuất phát trước 13h chiều để qua đèo lúc trời còn sáng rõ."
    }
  ],
  "canh-bao-ghep-doan": [
    {
      id: "msg_g1",
      author: "Trọng Hiếu (Hà Nội)",
      rank: "Phượt Thủ Bản Lĩnh",
      avatar: "🤝",
      tag: "🤝 Tìm đồng đội",
      routeId: "y-ty-bat-xat-lung-po",
      routeName: "Lũng Pô — Y Tý — Sa Pa",
      time: "5 phút trước",
      likes: 8,
      text: "Thứ 6 tuần này nhóm mình có 3 xe côn tay xuất phát từ Lào Cai đi cột cờ Lũng Pô – Y Tý – Mường Hum (2N1Đ). Có bạn nào chạy cùng cung muốn nhập đoàn đi chung hỗ trợ đồ sửa xe không?"
    },
    {
      id: "msg_g2",
      author: "Quốc Bảo (Quảng Bình)",
      rank: "Huyền Thoại Xuyên Việt",
      avatar: "🚨",
      tag: "⚠️ Cảnh báo đèo",
      routeId: "duong-ho-chi-minh-nhanh-tay",
      routeName: "Đường Hồ Chí Minh Nhánh Tây",
      time: "35 phút trước",
      likes: 27,
      text: "Nhắc nhẹ anh em chuẩn bị chạy Đường Hồ Chí Minh Nhánh Tây (Phong Nha – Khe Sanh): Bắt buộc đổ đầy bình xăng ở Phong Nha và mang thêm can 2L dự phòng vì suốt 125km qua Đèo U Bò không có cây xăng nào!"
    }
  ]
};

class PhuotDataTier {
  constructor() {
    this.SAVED_TRIPS_KEY = "phuot_tier3_saved_trips";
    this.REVIEWS_KEY = "phuot_tier3_community_reviews";
    this.USER_SESSION_KEY = "phuot_tier3_user_passport";
    this.CHAT_STORE_KEY = "phuot_tier3_live_chat";
  }

  // 1. QUẢN LÝ ĐĂNG NHẬP & HỘ CHIẾU PHƯỢT THỦ
  getCurrentUser() {
    try {
      const raw = localStorage.getItem(this.USER_SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  computeRankByConqueredCount(count) {
    if (count >= 6) return "Huyền Thoại Xuyên Việt";
    if (count >= 3) return "Phượt Thủ Bản Lĩnh";
    return "Tân Binh Đường Đèo";
  }

  loginWithProfile(profileData) {
    const conquered = profileData.conqueredRoutes || [];
    const userObj = {
      id: profileData.id || "user_" + Date.now(),
      name: profileData.name,
      city: profileData.city || "Việt Nam",
      vehicle: profileData.vehicle || "Xe côn tay / Xe số",
      avatar: profileData.avatar || "🏍️",
      verified: true,
      conqueredRoutes: conquered,
      rankTitle: profileData.rankTitle || this.computeRankByConqueredCount(conquered.length),
      loginAt: new Date().toISOString()
    };
    localStorage.setItem(this.USER_SESSION_KEY, JSON.stringify(userObj));
    return userObj;
  }

  logoutUser() {
    localStorage.removeItem(this.USER_SESSION_KEY);
  }

  toggleConqueredRoute(routeId) {
    let user = this.getCurrentUser();
    if (!user) {
      // Nếu chưa đăng nhập, tự động khởi tạo Hộ chiếu Phượt thủ nhanh
      user = this.loginWithProfile({
        name: "Phượt Thủ Việt Nam",
        city: "Việt Nam",
        vehicle: "Xe máy / Ô tô",
        avatar: "🧭",
        conqueredRoutes: []
      });
    }
    const idx = user.conqueredRoutes.indexOf(routeId);
    let added = false;
    if (idx > -1) {
      user.conqueredRoutes.splice(idx, 1);
    } else {
      user.conqueredRoutes.push(routeId);
      added = true;
    }
    user.rankTitle = this.computeRankByConqueredCount(user.conqueredRoutes.length);
    localStorage.setItem(this.USER_SESSION_KEY, JSON.stringify(user));
    return { user, added };
  }

  // 2. QUẢN LÝ SỔ TAY LỊCH TRÌNH
  getSavedTrips() {
    try {
      return JSON.parse(localStorage.getItem(this.SAVED_TRIPS_KEY) || "[]");
    } catch {
      return [];
    }
  }

  saveTrip(tripRecord) {
    const trips = this.getSavedTrips();
    const existingIndex = trips.findIndex((t) => t.routeId === tripRecord.routeId);
    if (existingIndex > -1) {
      trips[existingIndex] = { ...tripRecord, updatedAt: new Date().toISOString() };
    } else {
      trips.unshift({ ...tripRecord, id: "trip_" + Date.now(), createdAt: new Date().toISOString() });
    }
    localStorage.setItem(this.SAVED_TRIPS_KEY, JSON.stringify(trips));
    return trips;
  }

  deleteTrip(tripId) {
    const trips = this.getSavedTrips().filter((t) => t.id !== tripId && t.routeId !== tripId);
    localStorage.setItem(this.SAVED_TRIPS_KEY, JSON.stringify(trips));
    return trips;
  }

  // 3. QUẢN LÝ ĐÁNH GIÁ CUNG ĐƯỜNG & BÌNH CHỌN HỮU ÍCH
  getReviewsForRoute(routeId) {
    try {
      const stored = JSON.parse(localStorage.getItem(this.REVIEWS_KEY) || "{}");
      const customList = stored[routeId] || [];
      const seedList = SEED_REVIEWS[routeId] || [
        {
          id: "seed_" + routeId,
          author: "Cộng đồng Dọc Miền Đất Nước",
          rank: "Kiểm định thực địa",
          vehicle: "Xe máy & Ô tô",
          rating: 5,
          topic: "⚠️ Lưu ý đường đèo",
          date: "Cập nhật gần đây",
          likes: 11,
          note: "Đường quốc lộ và tỉnh lộ thông thoáng. Khuyến nghị kiểm tra má phanh, lốp và đổ đầy nhiên liệu tại thị trấn đầu tuyến trước khi lên đèo."
        }
      ];
      return [...customList, ...seedList];
    } catch {
      return SEED_REVIEWS[routeId] || [];
    }
  }

  addReviewForRoute(routeId, reviewObj) {
    const stored = JSON.parse(localStorage.getItem(this.REVIEWS_KEY) || "{}");
    if (!stored[routeId]) stored[routeId] = [];
    const newRev = {
      id: "rev_" + Date.now(),
      likes: 1,
      date: "Vừa xong",
      ...reviewObj
    };
    stored[routeId].unshift(newRev);
    localStorage.setItem(this.REVIEWS_KEY, JSON.stringify(stored));
    return this.getReviewsForRoute(routeId);
  }

  // 4. QUẢN LÝ KÊNH CHAT CỘNG ĐỒNG PHƯỢT THỦ
  getChatMessages(channelId = "toan-quoc") {
    try {
      const stored = JSON.parse(localStorage.getItem(this.CHAT_STORE_KEY) || "{}");
      const customMsgs = stored[channelId] || [];
      const seedMsgs = SEED_CHAT_MESSAGES[channelId] || [];
      return [...customMsgs, ...seedMsgs];
    } catch {
      return SEED_CHAT_MESSAGES[channelId] || [];
    }
  }

  addChatMessage(channelId, msgData) {
    const stored = JSON.parse(localStorage.getItem(this.CHAT_STORE_KEY) || "{}");
    if (!stored[channelId]) stored[channelId] = [];
    const newMsg = {
      id: "chat_" + Date.now(),
      time: "Vừa xong",
      likes: 1,
      ...msgData
    };
    stored[channelId].unshift(newMsg);
    localStorage.setItem(this.CHAT_STORE_KEY, JSON.stringify(stored));
    return this.getChatMessages(channelId);
  }
}

class PhuotServiceTier {
  constructor(dataTier) {
    this.db = dataTier;
  }

  calculateHaversineKm(lat1, lng1, lat2, lng2) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  buildRouteStages(route, waypoints) {
    if (!waypoints || waypoints.length === 0) return [];
    const rawLegs = [];
    let totalRaw = 0;

    for (let i = 0; i < waypoints.length - 1; i++) {
      const d = this.calculateHaversineKm(
        waypoints[i].lat,
        waypoints[i].lng,
        waypoints[i + 1].lat,
        waypoints[i + 1].lng
      );
      rawLegs.push(d);
      totalRaw += d;
    }

    return waypoints.map((wp, idx) => {
      if (idx === 0) {
        return {
          index: idx + 1,
          name: wp.name,
          lat: wp.lat,
          lng: wp.lng,
          legKm: 0,
          role: "Điểm xuất phát",
          note: "Kiểm tra phanh, lốp, xăng đầy bình trước khi khởi hành"
        };
      }
      const prevRaw = rawLegs[idx - 1] || 1;
      const scaledKm =
        totalRaw > 0
          ? Math.max(5, Math.round((prevRaw / totalRaw) * route.distanceKm))
          : Math.round(route.distanceKm / (waypoints.length - 1));
      const isLast = idx === waypoints.length - 1;

      return {
        index: idx + 1,
        name: wp.name,
        lat: wp.lat,
        lng: wp.lng,
        legKm: scaledKm,
        role: isLast ? "Đích đến hành trình" : `Chặng trung chuyển ${idx}`,
        note: isLast
          ? `Hoàn thành tổng lộ trình ~${route.distanceKm} km`
          : `Di chuyển ~${scaledKm} km từ ${waypoints[idx - 1].name}`
      };
    });
  }

  getRegionalOverviewStats(routes, currentMonth) {
    return Object.keys(REGION_METADATA).map((regionName) => {
      const meta = REGION_METADATA[regionName];
      const regionRoutes = routes.filter((r) => r.region === regionName);
      const totalKm = regionRoutes.reduce((sum, r) => sum + r.distanceKm, 0);
      const inSeasonCount = regionRoutes.filter((r) => r.bestMonths.includes(currentMonth)).length;

      return {
        regionName,
        ...meta,
        routeCount: regionRoutes.length,
        totalKm,
        inSeasonCount,
        sampleRoutes: regionRoutes.slice(0, 2).map((r) => r.title.split("—")[0].trim())
      };
    });
  }

  // Tính toán Biểu đồ Độ cao Địa hình (Elevation Profile) & Đặc sản Ẩm thực Vùng miền
  getRouteElevationAndCulinary(route, waypoints) {
    const id = route.id;
    let baseElevations = [120, 680, 1150, 1480, 920, 450];
    let difficulty = "4.2 / 5 · Đèo cao & Cua tay áo";
    let dishes = [
      "🍲 Thắng cố & Lẩu gà đen",
      "🥟 Bánh cuốn trứng nóng",
      "🍙 Xôi ngũ sắc vùng cao",
      "🥩 Thịt trâu gác bếp"
    ];

    if (id.includes("ha-giang") || id.includes("lung-cu")) {
      baseElevations = [280, 1050, 890, 1120, 1470, 1520, 740];
      difficulty = "4.8 / 5 · Cua tay áo gắt & Vách đá cao";
      dishes = [
        "🍲 Thắng cố phố cổ Đồng Văn",
        "🥚 Bánh cuốn trứng nước hầm xương",
        "🥣 Cháo ấu tẩu giải cảm đêm",
        "🌸 Bánh tam giác mạch nướng"
      ];
    } else if (id.includes("tay-bac") || id.includes("ta-xua") || id.includes("y-ty")) {
      baseElevations = [80, 1250, 1860, 2000, 1450, 980];
      difficulty = "4.9 / 5 · Đỉnh đèo săn mây >1.800m";
      dishes = [
        "🐟 Lẩu cá tầm & Cá hồi Ô Quy Hồ",
        "🍙 Xôi nếp Tú Lệ & Cốm vùng cao",
        "🥩 Thịt trâu gác bếp Mường Thanh",
        "🍵 Trà cổ thụ Shan Tuyết Tà Xùa"
      ];
    } else if (id.includes("cao-bang") || id.includes("binh-lieu")) {
      baseElevations = [150, 620, 980, 750, 1305, 480];
      difficulty = "4.0 / 5 · Đèo nhiều tầng dốc";
      dishes = [
        "🦆 Vịt quay 7 vị mắc mật Cao Bằng",
        "🥟 Bánh áp chao & Phở chua",
        "🌰 Hạt dẻ Trùng Khánh rang bơ",
        "🐓 Gà đen Tiên Yên – Bình Liêu"
      ];
    } else if (id.includes("moc-chau") || id.includes("nghe-an")) {
      baseElevations = [50, 880, 1050, 1120, 1450, 620];
      difficulty = "3.6 / 5 · Đèo sương mù vừa phải";
      dishes = [
        "🥩 Bê chao Mộc Châu & Cá suối nướng",
        "🎍 Cơm lam & Gà đồi Pù Luông",
        "🍲 Nhút Thanh Chương & Cá mát sông Giăng",
        "🥛 Sữa tươi nóng thảo nguyên"
      ];
    } else if (
      id.includes("hai-van") ||
      id.includes("son-tra") ||
      id.includes("phu-yen") ||
      id.includes("binh-thuan") ||
      id.includes("quy-nhon") ||
      id.includes("ven-bien") ||
      id.includes("cat-ba") ||
      id.includes("mui-doi")
    ) {
      baseElevations = [15, 180, 496, 320, 85, 25];
      difficulty = "2.8 / 5 · Đường ven biển & Đèo thoáng";
      dishes = [
        "🦑 Bánh căn mực tươi Vĩnh Hy – Phan Rang",
        "🐟 Mắt cá ngừ đại dương & Sò huyết Đầm Ô Loan",
        "🦪 Hàu sữa Lăng Cô & Bún chả cá Quy Nhơn",
        "🍇 Nho tươi & Tỏi cô đơn Ninh Thuận"
      ];
    } else if (
      id.includes("truong-son") ||
      id.includes("da-lat") ||
      id.includes("ta-dung") ||
      id.includes("tay-nguyen") ||
      id.includes("ho-chi-minh")
    ) {
      baseElevations = [45, 780, 1250, 1620, 1500, 1480];
      difficulty = "4.1 / 5 · Đèo thông dài & Xuyên rừng";
      dishes = [
        "🍗 Gà nướng cơm lam Măng Đen – Pleiku",
        "🍲 Lẩu gà lá é & Bánh ướt lòng gà Đà Lạt",
        "🍜 Phở khô Gia Lai (Phở hai tô)",
        "☕ Cà phê Arabica Cầu Đất – Buôn Ma Thuột"
      ];
    } else if (id.includes("ca-mau") || id.includes("an-giang")) {
      baseElevations = [8, 15, 710, 45, 12, 5];
      difficulty = "2.2 / 5 · Đường bằng & Cầu dây văng";
      dishes = [
        "🦀 Cua biển Năm Căn – Đất Mũi Cà Mau",
        "🍲 Lẩu mắm Châu Đốc & Cá linh bông điên điển",
        "🌴 Thốt nốt tươi & Gà đốt lá chúc Tri Tôn",
        "🥞 Bánh xèo miền Tây & Hủ tiếu Cần Thơ"
      ];
    }

    const points = waypoints.map((wp, idx) => {
      const elev = baseElevations[idx % baseElevations.length];
      return {
        name: wp.name,
        lat: wp.lat,
        lng: wp.lng,
        elevation: elev
      };
    });

    const maxElev = Math.max(...points.map((p) => p.elevation));
    return {
      points,
      maxElev,
      difficulty,
      dishes
    };
  }

  // Tính toán Chỉ số "Sinh Tồn Đường Đèo": Quãng trắng Cây xăng, Sóng 4G & Mặt đường thực tế (Mục 2)
  getFieldSurvivalProfile(route, waypoints, vehicle = "motorbike") {
    const id = route.id;
    const wps = waypoints && waypoints.length > 0 ? waypoints : route.waypoints;
    const startWp = wps[0]?.name || "Thị trấn đầu tuyến";
    const midWp = wps[Math.floor(wps.length / 2)]?.name || "Thị trấn trung tâm";

    let maxFuelGapKm = 38;
    let signalPct = 88;
    let signalNote = `Sóng 4G ổn định dọc tuyến, chỉ yếu nhẹ ở các khúc cua khuất núi gần ${midWp}.`;
    let roadSurface = "85% Nhựa tiêu chuẩn · 15% Đèo dốc quanh co";
    let mechanicalTip = "Kiểm tra áp suất lốp và độ ăn của phanh trước/sau trước khi khởi hành.";

    if (
      id.includes("ha-giang") ||
      id.includes("lung-cu") ||
      id.includes("tay-bac") ||
      id.includes("ta-xua") ||
      id.includes("y-ty") ||
      id.includes("hoang-su-phi")
    ) {
      maxFuelGapKm = 54;
      signalPct = 76;
      signalNote = `Dễ lõm sóng 4G dưới khe vực & sườn đèo sau ${midWp} — nên tải sẵn Ảnh Thẻ Hành Trình Bỏ Túi.`;
      roadSurface = "78% Nhựa đèo dốc gắt · 22% Cua tay áo & đường bản vùng cao";
      mechanicalTip =
        vehicle === "motorbike"
          ? "Bắt buộc về số thấp (số 1–2) khi đổ đèo; tuyệt đối không rà phanh liên tục gây cháy bố thắng."
          : "Sử dụng số bán tự động (S / L / B) khi đổ đèo dài để hãm bằng động cơ, bật đèn phá sương.";
    } else if (
      id.includes("truong-son") ||
      id.includes("ho-chi-minh") ||
      id.includes("nghe-an") ||
      id.includes("binh-lieu") ||
      id.includes("cao-bang")
    ) {
      maxFuelGapKm = 64;
      signalPct = 72;
      signalNote = `Có đoạn xuyên rừng/biên giới dài gần ${midWp} sóng yếu — cần lưu bản đồ Offline trước.`;
      roadSurface = "82% Đường bê tông/nhựa xuyên rừng · 18% Đèo dốc liên tục";
      mechanicalTip =
        vehicle === "motorbike"
          ? "Bình xăng xe số/côn tay (~4L) hao hơn ~25% khi leo dốc — phải đổ đầy tại thị trấn trước khi vào rừng."
          : "Kiểm tra lốp dự phòng, nước làm mát và đổ đầy bình nhiên liệu trước khi vào nhánh xuyên rừng.";
    } else if (
      id.includes("ven-bien") ||
      id.includes("hai-van") ||
      id.includes("phu-yen") ||
      id.includes("binh-thuan") ||
      id.includes("quy-nhon") ||
      id.includes("cat-ba")
    ) {
      maxFuelGapKm = 28;
      signalPct = 95;
      signalNote = `Sóng 4G/5G căng đầy toàn tuyến ven biển (riêng đoạn vách đá sát biển gần ${midWp} gió tạt mạnh).`;
      roadSurface = "94% Nhựa phẳng ven biển tuyệt đẹp · 6% Đèo dốc ven vịnh";
      mechanicalTip =
        vehicle === "motorbike"
          ? "Cung ven biển nhiều đoạn gió ngang mạnh — giữ chắc tay lái khi qua mũi đá và cầu vượt biển."
          : "Đường nhựa ven biển thoáng đẹp, chú ý tốc độ tại các khúc cua ngắm cảnh có nhiều xe dừng chụp ảnh.";
    } else if (id.includes("ca-mau") || id.includes("an-giang") || id.includes("dong-thap")) {
      maxFuelGapKm = 24;
      signalPct = 96;
      signalNote = "Sóng 4G phủ kín toàn tuyến đồng bằng & rừng ngập mặn.";
      roadSurface = "92% Quốc lộ/tỉnh lộ bằng phẳng · 8% Cầu dân sinh & đường ven kênh";
      mechanicalTip = "Chú ý các mố cầu cao đặc trưng miền Tây và kiểm tra lốp chống đinh.";
    }

    const refuelNote =
      vehicle === "motorbike"
        ? `Quãng trắng xa nhất không cây xăng: ~${maxFuelGapKm} km · Đổ đầy bình tại: ${startWp} & ${midWp}.`
        : `Quãng trắng xa nhất: ~${maxFuelGapKm} km · Trạm xăng chuẩn Euro 5 tại: ${startWp} & ${midWp}.`;

    return {
      maxFuelGapKm,
      refuelStop: `${startWp} → ${midWp}`,
      refuelNote,
      signalPct,
      signalNote,
      roadSurface,
      mechanicalTip
    };
  }

  // Tính toán Lịch trình Theo Ngày & Khung Giờ Vàng + Cảnh báo Đổ đèo tối (Golden Hour Pacing Engine)
  buildTimedDayByDaySchedule(
    route,
    waypoints,
    totalDays = 3,
    startTimeStr = "05:30",
    paceMode = "standard",
    vehicle = "motorbike"
  ) {
    const stages = this.buildRouteStages(route, waypoints);
    const safeDays = Math.max(1, Math.min(totalDays || route.defaultDays || 2, Math.max(1, stages.length)));

    const [startH, startM] = String(startTimeStr || "05:30")
      .split(":")
      .map((n) => parseInt(n, 10) || 0);
    const baseStartMinutes = startH * 60 + startM;

    // Tốc độ trung bình đường thực tế tại Việt Nam (tính cả đèo dốc)
    const isHighland =
      route.region === "Miền Bắc" ||
      route.id.includes("truong-son") ||
      route.id.includes("da-lat");
    let avgSpeedKmh = isHighland ? 38 : 48;
    let stopMinutesPerLeg = 28;

    if (paceMode === "relaxed") {
      avgSpeedKmh -= 7;
      stopMinutesPerLeg = 42;
    } else if (paceMode === "steady") {
      avgSpeedKmh += 8;
      stopMinutesPerLeg = 16;
    }
    if (vehicle === "car" && !isHighland) avgSpeedKmh += 6;

    const formatClock = (mins) => {
      const normalized = ((Math.round(mins) % 1440) + 1440) % 1440;
      const hh = String(Math.floor(normalized / 60)).padStart(2, "0");
      const mm = String(normalized % 60).padStart(2, "0");
      return `${hh}:${mm}`;
    };

    const classifyTimeSlot = (mins) => {
      const normalized = ((Math.round(mins) % 1440) + 1440) % 1440;
      if (normalized >= 300 && normalized <= 450) {
        return {
          level: "golden-dawn",
          label: "🌅 Khung giờ vàng Săn mây / Bình minh"
        };
      }
      if (normalized > 450 && normalized < 975) {
        return {
          level: "daylight",
          label: "☀️ Nắng đẹp ngắm cảnh & di chuyển"
        };
      }
      if (normalized >= 975 && normalized <= 1065) {
        return {
          level: "golden-sunset",
          label: "🌇 Giờ vàng Hoàng hôn trên đèo / biển"
        };
      }
      return {
        level: "night-warning",
        label: "⚠️ Đổ đèo trời tối (Sau 17:45) — Dễ gặp sương mù!"
      };
    };

    let currentDay = 1;
    let currentClockMins = baseStartMinutes;
    let hasNightWarning = false;
    const stagesPerDay = Math.max(1, Math.ceil(stages.length / safeDays));

    const scheduled = stages.map((st, idx) => {
      const targetDay = Math.min(safeDays, Math.floor(idx / stagesPerDay) + 1);
      if (targetDay > currentDay) {
        currentDay = targetDay;
        // Sáng ngày hôm sau khởi hành đúng giờ xuất phát người dùng chọn
        currentClockMins = baseStartMinutes;
      }

      if (idx > 0 && targetDay === Math.min(safeDays, Math.floor((idx - 1) / stagesPerDay) + 1)) {
        const travelMins = (st.legKm / Math.max(20, avgSpeedKmh)) * 60;
        currentClockMins += travelMins + stopMinutesPerLeg;
      } else if (idx > 0) {
        // Chặng đầu tiên của ngày mới di chuyển từ điểm nghỉ đêm hôm trước
        const travelMins = (st.legKm / Math.max(20, avgSpeedKmh)) * 60;
        currentClockMins += travelMins;
      }

      const slot = classifyTimeSlot(currentClockMins);
      if (slot.level === "night-warning") hasNightWarning = true;

      return {
        ...st,
        dayNumber: currentDay,
        etaStr: formatClock(currentClockMins),
        timeLevel: slot.level,
        timeTag: slot.label
      };
    });

    return {
      stages: scheduled,
      totalDays: safeDays,
      hasNightWarning
    };
  }
}

window.phuotDB = new PhuotDataTier();
window.phuotService = new PhuotServiceTier(window.phuotDB);
window.REGION_METADATA = REGION_METADATA;
window.DEMO_PASSPORT_PROFILES = DEMO_PASSPORT_PROFILES;
