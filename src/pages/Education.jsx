import { useState } from "react";

export default function Education() {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [sortBy, setSortBy] = useState("default");

  const articles = [
    {
      title: "Menemukan Energi dalam Sunyi: Panduan Sukses Karir & Sosial untuk Introvert",
      category: "Psikologi Positif",
      time: "5 menit baca",
      icon: "🤫",
      color: "bg-emerald-50 text-emerald-700 border-emerald-100",
      intro: "Sering merasa lelah setelah bersosialisasi? Menjadi introvert bukanlah kelemahan, melainkan kekuatan hening yang menakjubkan jika dikelola dengan benar.",
      content: `Menjadi seorang introvert di dunia yang sepertinya tidak pernah berhenti berbicara bisa terasa sangat menantang. Banyak orang keliru menganggap introversi sebagai rasa malu (shyness) atau kurangnya kemampuan sosial. Padahal, introversi murni merupakan cara seseorang merespons stimulasi eksternal dan bagaimana mereka mengisi kembali 'baterai emosional' mereka.

Baterai sosial seorang introvert akan terkuras saat berada di tengah keramaian atau interaksi sosial yang intens. Mereka membutuhkan waktu menyendiri (solitude) untuk mengisi ulang energi tersebut. Sebaliknya, kaum ekstrovert mendapatkan energi justru dari interaksi dengan dunia luar.

Menemukan kesuksesan sebagai introvert:
Pertama, hargai kebutuhanmu akan kesunyian. Jangan merasa bersalah jika kamu menolak ajakan berkumpul hanya karena ingin membaca buku atau bersantai di rumah. Itu adalah bentuk perawatan diri (self-care) yang sangat penting bagi kesehatan mentalmu.

Kedua, gunakan kekuatan mendengarmu. Introvert adalah pendengar yang sangat baik dan pemikir mendalam. Dalam lingkungan kerja atau pertemanan, kontribusimu yang dipikirkan dengan matang sering kali jauh lebih bernilai daripada sekadar berbicara tanpa arah.

Ketiga, kelola energi sosialmu secara cerdas. Jika kamu tahu ada acara penting besok, luangkan waktu malam ini untuk beristirahat penuh. Mengetahui kapasitas diri dan menetapkan batasan adalah kunci agar kamu tetap bisa bersosialisasi tanpa mengalami kelelahan mental.`
    },
    {
      title: "Lebih dari Sekadar Rapi: Mengupas Mitos dan Fakta Mengenai OCD",
      category: "Kesehatan Mental",
      time: "5 menit baca",
      icon: "🧼",
      color: "bg-indigo-50 text-indigo-700 border-indigo-100",
      intro: "Banyak orang mengira OCD hanyalah sifat suka kebersihan yang berlebihan. Mari pahami esensi medis di balik Obsessive-Compulsive Disorder.",
      content: `Obsessive-Compulsive Disorder (OCD) sering kali disalahpahami dalam budaya populer. Kita sering mendengar orang berkata, 'Aku agak OCD hari ini' hanya karena mereka ingin merapikan meja kerja atau mencuci tangan. Namun, OCD secara medis adalah gangguan kesehatan mental yang serius, kronis, dan sering kali melumpuhkan penderitanya.

OCD terdiri dari dua komponen utama: Obsesi dan Kompulsi. Obsesi adalah pikiran, dorongan, atau bayangan mental yang berulang, tidak diinginkan, dan memicu kecemasan hebat (misalnya, takut terkontaminasi kuman, atau takut mencelakai orang lain secara tidak sengaja). Kompulsi adalah perilaku berulang yang dirasa harus dilakukan oleh penderita untuk meredakan kecemasan tersebut (misalnya, mencuci tangan puluhan kali, atau memeriksa kunci pintu secara berulang-ulang dengan pola tertentu).

Memahami kenyataan hidup dengan OCD:
Pertama, ketahuilah bahwa tindakan kompulsi sebenarnya tidak memberikan kepuasan, melainkan hanya meredakan kecemasan untuk sementara waktu. Penderita OCD sering kali menyadari bahwa pikiran mereka tidak logis, namun mereka merasa tidak berdaya untuk menghentikannya.

Kedua, dukung tanpa menghakimi. Jika ada teman atau keluarga dengan gejala OCD, jangan memarahi mereka atau memaksa mereka menghentikan ritualnya secara mendadak. Hal tersebut justru akan melipatgandakan tingkat kecemasan mereka.

Ketiga, cari terapi profesional. Penanganan OCD yang paling efektif adalah kombinasi antara terapi perilaku (khususnya Exposure and Response Prevention - ERP) dan, jika diperlukan, obat-obatan medis di bawah pengawasan psikiater. Sembuh dari OCD bukan berarti menghilangkan kecemasan sepenuhnya, melainkan belajar mengendalikan reaksi kita terhadap pikiran obsesif tersebut.`
    },
    {
      title: "Menghadapi Pasangan atau Teman NPD (Narcissistic Personality Disorder)",
      category: "Hubungan",
      time: "6 menit baca",
      icon: "🎭",
      color: "bg-red-50 text-red-700 border-red-100",
      intro: "Merasa dimanipulasi atau selalu disalahkan? Ketahui tanda-tanda kepribadian narsistik (NPD) dan cara aman menjaga kesehatan mentalmu.",
      content: `Menjalin hubungan dengan seseorang yang memiliki Gangguan Kepribadian Narsistik (NPD) bisa sangat melelahkan secara emosional dan mental. NPD ditandai dengan pola jangka panjang berupa kebutuhan ekstrem akan pujian, kurangnya empati terhadap orang lain, dan keyakinan bahwa diri mereka lebih unggul dari orang lain.

Di awal hubungan, seorang narsistik sering kali menampilkan pesona luar biasa (love bombing) untuk memikatmu. Namun, seiring berjalannya waktu, mereka akan mulai memanipulasi emosimu. Taktik umum yang mereka gunakan meliputi gaslighting (membuatmu meragukan ingatan atau kewarasanmu sendiri) dan pemutarbalikan fakta sehingga kamu selalu menjadi pihak yang bersalah dalam setiap konflik.

Cara melindungi diri saat berhadapan dengan NPD:
Pertama, sadarilah bahwa kamu tidak bisa mengubah atau menyembuhkan mereka. NPD adalah gangguan kepribadian mendalam yang membutuhkan terapi profesional jangka panjang. Berhenti berharap mereka akan mendadak meminta maaf dengan tulus atau memahami perasaanmu.

Kedua, tetapkan batasan (boundaries) yang sangat ketat. Jangan biarkan mereka mengontrol keuangan, pertemanan, atau keputusan pribadimu. Jika mereka mulai berteriak atau memanipulasi, komunikasikan batasanmu dengan tenang dan tegas, lalu tinggalkan percakapan tersebut.

Ketiga, terapkan metode 'Gray Rock' jika terpaksa harus tetap berinteraksi (misalnya rekan kerja atau mantan pasangan yang memiliki anak bersama). Gray Rock berarti bersikap membosankan, dingin, dan tidak memberikan respons emosional apa pun terhadap provokasi mereka. Tanpa adanya reaksi emosional dari Anda, pelaku narsistik akan kehilangan ketertarikan untuk memanipulasi Anda.`
    },
    {
      title: "Mengenali Gangguan Kecemasan Sosial (Social Anxiety)",
      category: "Kecemasan",
      time: "5 menit baca",
      icon: "👥",
      color: "bg-amber-50 text-amber-700 border-amber-100",
      intro: "Merasa sangat gugup saat harus berbicara di depan umum atau bertemu orang baru? Pelajari cara melatih pikiran dari rasa takut dihakimi.",
      content: `Hampir semua orang pernah merasa gugup sebelum presentasi atau wawancara kerja. Namun bagi penderita Gangguan Kecemasan Sosial (Social Anxiety Disorder), ketakutan bersosialisasi ini begitu intens hingga mengganggu aktivitas sehari-hari mereka. Ketakutan terbesar mereka bukanlah keramaian itu sendiri, melainkan ketakutan akan dihakimi, dipermalukan, atau ditolak oleh orang lain.

Saat berada di situasi sosial, mereka akan mengalami gejala fisik nyata seperti jantung berdebar kencang, keringat dingin, gemetar, mual, hingga sulit berbicara. Akibatnya, mereka cenderung menghindari pertemuan sosial, yang pada akhirnya memicu perasaan terisolasi dan kesepian.

Langkah melatih kecemasan sosial:
Pertama, tantang pikiran negatifmu. Saat merasa cemas orang lain menilaimu buruk, tanyakan pada dirimu: Apakah ada bukti nyata mereka menghakimiku? Sering kali ketakutan itu hanyalah skenario terburuk yang diciptakan oleh pikiran cemasmu sendiri.

Kedua, fokuslah ke luar, bukan ke dalam diri. Penderita kecemasan sosial terlalu fokus memantau diri sendiri (misalnya: apakah caraku berdiri aneh? Apakah suaraku bergetar?). Cobalah alihkan perhatianmu untuk mendengarkan topik pembicaraan orang lain secara aktif.

Ketiga, lakukan paparan bertahap (gradual exposure). Jangan langsung memaksakan diri menghadiri pesta besar. Mulailah dari langkah kecil, seperti menyapa kasir di toko, memesan makanan dengan suara jelas, atau datang ke kumpul kecil bersama 2-3 orang teman dekat.`
    },
    {
      title: "Mengatasi Sindrom Impostor: Berhenti Merasa Diri sebagai Penipu",
      category: "Manajemen Stres",
      time: "5 menit baca",
      icon: "🕵️",
      color: "bg-red-50 text-red-700 border-red-100",
      intro: "Merasa pencapaianmu hanyalah keberuntungan belaka dan takut ketahuan tidak kompeten? Yuk, kenali impostor syndrome dan cara mengatasinya.",
      content: `Pernahkah kamu meraih kesuksesan akademik atau karir, namun di dalam hati kamu merasa bahwa kamu tidak cukup pintar? Apakah kamu merasa semua itu hanyalah kebetulan atau keberuntungan, dan kamu selalu cemas bahwa suatu hari nanti orang-orang akan menyadari bahwa kamu sebenarnya tidak kompeten?

Kondisi psikologis ini dikenal sebagai Impostor Syndrome atau Sindrom Impostor. Menariknya, sindrom ini paling sering dialami oleh orang-orang yang berprestasi tinggi. Mereka gagal menginternalisasi kesuksesan mereka sendiri dan terus merasa seperti seorang penipu di tengah lingkungan mereka.

Cara berdamai dengan Impostor Syndrome:
Pertama, bedakan antara perasaan dan fakta. Merasa tidak kompeten bukan berarti kamu benar-benar tidak kompeten. Sadarilah bahwa perasaan ragu pada diri sendiri adalah hal yang wajar dialami oleh siapa saja yang sedang belajar dan berkembang.

Kedua, dokumentasikan prestasimu. Buat catatan khusus berisi daftar keberhasilan, sertifikat, atau pujian tertulis yang pernah kamu terima dari dosen atau atasan. Ketika rasa tidak percaya diri menyerang, baca kembali catatan tersebut sebagai bukti objektif atas kemampuan dirimu.

Ketiga, bagikan apa yang kamu rasakan. Berbicara dengan mentor tepercaya atau teman dekat akan menyadarkanmu bahwa banyak orang sukses lainnya juga merasakan hal yang sama. Kamu tidak perlu menjadi sempurna untuk diakui; belajarlah untuk menerima kesalahan sebagai bagian dari proses belajar.`
    },
    {
      title: "Membangun Ritme Tidur Sehat di Tengah Kesibukan",
      category: "Kesehatan Tidur",
      time: "5 menit baca",
      icon: "🌙",
      color: "bg-emerald-50 text-emerald-700 border-emerald-100",
      intro: "Tuntutan pekerjaan atau kuliah sering kali merusak ritme tidur tubuh kita. Temukan cara aman menyeimbangkan waktu tidur Anda.",
      content: `Di dunia modern yang serba cepat, tidur sering kali menjadi hal pertama yang kita korbankan demi menyelesaikan tugas atau mengejar target kerja. Padahal, kurang tidur secara kronis dapat menurunkan sistem kegagalan tubuh, merusak konsentrasi, dan meningkatkan risiko gangguan kecemasan serta depresi.

Tubuh manusia dikendalikan oleh jam internal biologis yang disebut ritme sirkadian. Ritme ini merespons sinyal cahaya dan kegelapan untuk mengatur kapan kita merasa segar dan kapan kita merasa mengantuk. Ketika kita tidur pada waktu yang tidak teratur, ritme ini terganggu, menyebabkan tubuh terasa lelah sepanjang hari.

Tips menjaga ritme sirkadian tetap seimbang:
Pertama, buat jadwal tidur yang konsisten. Usahakan untuk tidur dan bangun pada jam yang sama setiap hari, bahkan di hari libur akhir pekan. Konsistensi ini akan melatih tubuhmu untuk secara otomatis merasa mengantuk saat waktunya tiba.

Kedua, batasi konsumsi kafein dan makanan berat mendekati jam tidur. Kafein dapat bertahan di dalam tubuh hingga 6-8 jam. Hindari kopi atau minuman bersoda di sore dan malam hari agar tidak mengganggu fase tidur dalammu.

Ketiga, optimalkan kenyamanan ruangan tidurmu. Pastikan kamar tidurmu cukup dingin, tenang, dan gelap sepenuhnya. Jika cahaya lampu masih menyala, otak akan menunda produksi melatonin, sehingga kamu akan kesulitan terlelap.`
    },
    {
      title: "Mengenali Hubungan Toxic dan Cara Keluar Darinya",
      category: "Hubungan",
      time: "5 menit baca",
      icon: "🥀",
      color: "bg-red-50 text-red-700 border-red-100",
      intro: "Apakah hubunganmu membuatmu lelah secara emosional? Yuk, pelajari ciri-ciri hubungan tidak sehat (toxic) dan cara berani mengambil keputusan terbaik untuk dirimu.",
      content: `Hubungan interpersonal seharusnya menjadi tempat aman di mana kita merasa didengar, dihargai, dan didukung. Namun, kenyataannya ada kalanya sebuah hubungan justru berubah menjadi sumber utama stres, kecemasan, dan rasa tidak percaya diri. Kondisi ini sering kali kita kenal dengan istilah hubungan toxic atau tidak sehat.

Ciri utama dari hubungan toxic adalah ketidakseimbangan energi. Kamu akan merasa bahwa kamu selalu memberi, mengalah, dan menyesuaikan diri, sementara pihak lain terus menuntut atau mengontrol hidupmu. Manipulasi emosional, seperti disalahkan atas kesalahan orang lain (gaslighting) atau dibuat merasa bersalah ketika mengekspresikan pendapat pribadi, juga merupakan tanda bahaya yang nyata.

Bagaimana cara mulai melepaskan diri dari lingkaran ini?
Langkah pertama yang paling penting adalah menyadari dan mengakui bahwa hubungan tersebut memang tidak sehat. Sering kali kita terjebak dalam fase penyangkalan karena mengingat masa-masa indah yang pernah dilewati bersama. Padahal, masa lalu yang indah tidak bisa dijadikan alasan untuk membenarkan perlakuan buruk di masa sekarang.

Kedua, mulailah menetapkan batasan yang tegas. Komunikasikan apa yang bisa kamu toleransi dan apa yang tidak. Jika pihak lain tidak menghargai batasan tersebut, itu adalah sinyal kuat bahwa kamu perlu menjaga jarak demi kesehatan mentalmu sendiri.

Ketiga, bangun kembali sistem pendukungmu. Hubungan toxic sering kali mengisolasi korbannya dari teman dekat dan keluarga. Hubungi kembali orang-orang yang tulus menyayangimu. Ingatlah bahwa kamu berhak mendapatkan hubungan yang sehat, penuh rasa hormat, dan saling mendukung.`
    },
    {
      title: "Navigasi Tekanan Teman Sebaya di Era Pergaulan Bebas",
      category: "Kesehatan Mental",
      time: "5 menit baca",
      icon: "🧭",
      color: "bg-indigo-50 text-indigo-700 border-indigo-100",
      intro: "Tekanan pergaulan sering kali memaksa kita mengikuti standar kelompok yang bertentangan dengan nurani. Simak cara asertif menjaga prinsip dirimu.",
      content: `Sebagai makhluk sosial, keinginan untuk diterima dan menjadi bagian dari suatu kelompok adalah hal yang sangat alami. Di masa remaja dan dewasa muda, pengaruh teman sebaya (peer pressure) sering kali memegang peranan yang sangat kuat. Sayangnya, tidak semua pengaruh kelompok itu berdampak positif. Terkadang, demi rasa solidaritas atau agar dianggap keren, kita merasa tertekan untuk mengikuti gaya hidup yang tidak sehat atau pergaulan bebas yang sebenarnya bertentangan dengan nilai-nilai pribadi kita.

Menolak ajakan kelompok memang membutuhkan keberanian yang besar. Ada rasa takut akan dikucilkan, dianggap membosankan, atau kehilangan teman. Namun, penting untuk disadari bahwa pertemanan yang tulus tidak akan pernah menuntutmu untuk merusak dirimu sendiri atau mengabaikan prinsip hidupmu demi kenyamanan mereka.

Bagaimana cara asertif menjaga prinsip diri di tengah pergaulan?
Pertama, kenali nilai-nilai hidupmu dengan jelas. Putuskan apa yang benar-benar baik untuk masa depanmu. Ketika kamu memiliki komitmen yang kuat terhadap dirimu sendiri, kamu tidak akan mudah goyah oleh bujuk rayu luar.

Kedua, latih cara menolak dengan tenang namun tegas. Kamu tidak perlu marah atau menceramahi teman-temanmu. Cukup katakan tidak dengan sopan, misalnya dengan kalimat: Terima kasih ajakannya, tapi aku sedang tidak tertarik untuk mencobanya. Memberikan penolakan yang jujur dan konsisten akan membuat orang lain menghargai batasanmu.

Ketiga, carilah lingkaran pertemanan baru yang memiliki nilai-nilai yang sama denganmu. Berada di lingkungan orang-orang yang saling mendukung pertumbuhan positif akan membuatmu merasa nyaman menjadi diri sendiri tanpa perlu berpura-pura.`
    },
    {
      title: "Menyembuhkan Luka Batin Akibat Dinamika Keluarga yang Kurang Sehat",
      category: "Kesehatan Mental",
      time: "6 menit baca",
      icon: "🏡",
      color: "bg-amber-50 text-amber-700 border-amber-100",
      intro: "Keluarga adalah rumah pertama, namun terkadang juga menjadi tempat tumbuhnya luka terdalam. Mari belajar menerima masa lalu dan pulih secara perlahan.",
      content: `Secara ideal, keluarga digambarkan sebagai tempat bernaung yang penuh kasih sayang, kehangatan, dan penerimaan tanpa syarat. Namun bagi sebagian dari kita, kenyataannya tidak selalu seindah itu. Konflik yang berkepanjangan, kritik yang terus-menerus, penolakan emosional, atau ekspektasi yang terlalu tinggi dari orang tua dapat meninggalkan luka batin yang mendalam hingga dewasa. Kondisi ini sering kali memicu kecemasan, depresi, atau rendahnya rasa percaya diri.

Menghadapi kenyataan bahwa rumah pertamamu bukanlah tempat yang aman adalah proses yang sangat berat. Kita sering kali merasa bersalah atau menganggap diri kita yang salah karena tidak bisa memenuhi harapan keluarga. Padahal, setiap anak berhak untuk tumbuh di lingkungan yang penuh kedamaian emosional.

Langkah pemulihan batin yang bisa kamu pelajari:
Pertama, terimalah bahwa kamu tidak bisa mengubah perilakunya orang tuamu atau anggota keluargamu. Menyadari keterbatasan kendali ini akan membebaskanmu dari beban berat untuk selalu mencoba memperbaiki keadaan yang berada di luar kuasamu. Fokuslah pada respon emosionalmu sendiri.

Kedua, terapkan batasan fisik dan emosional yang sehat. Jika tinggal bersama keluarga terasa terlalu melelahkan secara mental, luangkan waktu di luar rumah untuk kegiatan produktif, atau batasi topik pembicaraan yang sensitif saat berinteraksi. Menjaga jarak yang sehat bukan berarti kamu tidak menyayangi mereka, melainkan tindakan perlindungan diri agar jiwamu tetap stabil.

Ketiga, praktikan self-parenting. Belajarlah untuk memberikan kasih sayang, penghargaan, dan kelembutan pada dirimu sendiri yang mungkin tidak kamu dapatkan dari keluargamu. Kamu adalah orang dewasa yang kini memegang kendali penuh atas kebahagiaan dan masa depanmu sendiri.`
    },
    {
      title: "Memahami Bentuk Kekerasan dalam Rumah Tangga dan Mencari Bantuan",
      category: "Hubungan",
      time: "5 menit baca",
      icon: "🚪",
      color: "bg-red-50 text-red-700 border-red-100",
      intro: "Kekerasan dalam rumah tangga bukan hanya luka fisik, tapi juga mental. Ketahui jenis-jenisnya dan bagaimana cara aman mencari bantuan terdekat.",
      content: `Kekerasan Dalam Rumah Tangga (KDRT) adalah isu yang sangat sensitif namun sangat penting untuk dibicarakan secara terbuka. KDRT tidak melulu berupa kekerasan fisik yang meninggalkan bekas luka kasat mata. Bentuk kekerasan emosional seperti ancaman, intimidasi, penghinaan verbal yang merusak harga diri, pembatasan ruang gerak secara ekstrem, hingga kontrol keuangan sepihak (kekerasan ekonomi) adalah bagian dari KDRT yang sering kali tidak disadari oleh korbannya.

Dampak psikologis dari KDRT sangat menghancurkan. Korban biasanya mengalami trauma mendalam, rasa ketakutan yang konstan, depresi, hingga hilangnya rasa percaya terhadap lingkungan sekitar. Sering kali korban merasa terjebak karena merasa tidak memiliki tempat tujuan atau takut akan konsekuensi sosial jika bersuara.

Bagaimana cara menyikapi situasi ini secara aman?
Pertama, ketahuilah bahwa kekerasan dalam bentuk apa pun tidak pernah dibenarkan, dan itu sama sekali bukan kesalahanmu. Pelaku kekerasan sering kali memanipulasi korban agar merasa bahwa merekalah penyebab terjadinya kekerasan tersebut. Kamu berhak atas keselamatan hidup dan kedamaian jiwamu.

Kedua, dokumentasikan kejadian yang kamu alami jika memungkinkan secara aman. Catat tanggal, waktu, kronologi kejadian, serta simpan bukti foto luka atau pesan teks berisi ancaman. Dokumentasi ini akan sangat berguna jika kamu memutuskan untuk menempuh jalur hukum.

Ketiga, cari bantuan profesional atau jaringan sosial yang aman. Bicaralah dengan konselor kesehatan mental, kunjungi lembaga bantuan hukum, atau hubungi pusat layanan pengaduan kekerasan perempuan dan anak terdekat di kotamu. Jangan memendam masalah ini sendirian; pertolongan selalu tersedia untuk membantumu keluar dari situasi yang membahayakan.`
    },
    {
      title: "Berdamai dengan Rasa Insecure: Menghargai Keunikan Diri Sendiri",
      category: "Psikologi Positif",
      time: "5 menit baca",
      icon: "💎",
      color: "bg-emerald-50 text-emerald-700 border-emerald-100",
      intro: "Sering membandingkan diri dengan pencapaian orang lain? Insecurity adalah hal wajar, namun mari belajar mengubahnya menjadi kekuatan positif.",
      content: `Pernahkah kamu melihat postingan teman di media sosial dan tiba-tiba merasa bahwa hidupmu jalan di tempat? Atau mungkin kamu sering merasa ragu pada kemampuan dirimu sendiri saat ingin memulai hal baru? Perasaan tidak aman, ragu, atau kurang percaya diri ini biasa disebut dengan insecurity.

Insecurity sebenarnya adalah mekanisme alami otak untuk melindungi diri dari kegagalan atau penolakan sosial. Namun, jika dibiarkan mendominasi pikiranmu, rasa cemas ini akan menghambat potensimu untuk berkembang dan membuatmu terus-menerus merasa kurang.

Cara berdamai dengan rasa insecure secara bertahap:
Pertama, ubah fokus pembandingmu. Alih-alih membandingkan bab pertama hidupmu dengan bab pertengahan hidup orang lain yang tampak berkilau di media sosial, bandingkan dirimu hari ini dengan dirimu di masa lalu. Sadarilah sekecil apa pun kemajuan yang sudah kamu buat dengan penuh rasa syukur.

Kedua, terima ketidaksempurnaan sebagai bagian dari keindahan hidup. Tidak ada manusia yang memiliki kehidupan sempurna tanpa cela. Setiap orang memiliki perjuangan, kegagalan, dan kecemasannya masing-masing yang tidak mereka tampilkan ke permukaan.

Ketiga, apresiasi kelebihan dan keunikan yang kamu miliki. Tuliskan hal-hari yang berhasil kamu lakukan dengan baik, sekecil apa pun itu. Fokuslah mengembangkan kelebihan tersebut daripada terus meratapi kekuranganmu. Kamu berharga apa adanya.`
    },
    {
      title: "Seni Bersahabat dengan Overthinking di Malam Hari",
      category: "Kecemasan",
      time: "5 menit baca",
      icon: "🧠",
      color: "bg-amber-50 text-amber-700 border-amber-100",
      intro: "Pernahkah kamu berbaring di tempat tidur, siap untuk memejamkan mata, tapi otakmu justru mulai memutar kembali kesalahan masa lalu? Yuk, pelajari cara menenangkannya secara bertahap.",
      content: `Pernahkah kamu berbaring di tempat tidur, merasa sangat lelah, tetapi otakmu justru memutuskan untuk memutar ulang percakapan canggung beberapa tahun lalu? Atau mungkin kamu mendadak mencemaskan masa depan yang bahkan belum terjadi? Selamat, kamu sedang mengalami situasi yang biasa disebut overthinking.

Overthinking sebenarnya adalah tanda bahwa otak kita sedang berusaha terlalu keras untuk melindungimu dari bahaya. Otak mengira ada masalah besar yang harus segera diselesaikan, padahal tubuhmu hanya butuh istirahat. Sayangnya, semakin kita memaksa pikiran untuk diam, suara bising itu justru akan terdengar semakin keras di malam hari.

Langkah bersahabat yang bisa kamu coba:
Pertama, akui kehadirannya. Alih-alih kesal, cobalah katakan pada dirimu sendiri bahwa otakmu sedang khawatir lagi. Ucapkan terima kasih karena otak sudah berusaha melindungimu, tapi katakan juga bahwa sekarang saatnya tidur. Hal ini bisa mengurangi tensi emosional.

Kedua, keluarkan dari kepala. Sediakan kertas dan pena di dekat kasur. Tuliskan apa saja yang mengganggu pikiranmu secara acak. Setelah semuanya tertuang di kertas, otak akan merasa tugasnya untuk mengingat kekhawatiran itu sudah selesai.

Ketiga, fokus pada sensasi fisik. Tarik perhatianmu dari isi pikiran ke tubuhmu. Rasakan berat tubuhmu yang menempel di kasur, dinginnya udara kamar, atau kehangatan selimutmu. Cara sederhana ini membantu menurunkan gelombang otak agar siap terlelap.`
    },
    {
      title: "Latihan Napas Sederhana untuk Menenangkan Jantung yang Berdebar",
      category: "Kecemasan",
      time: "4 menit baca",
      icon: "🌬️",
      color: "bg-amber-50 text-amber-700 border-amber-100",
      intro: "Saat rasa cemas menyerang, dada terasa sesak dan jantung berdebar kencang. Tenang, ada teknik napas cepat untuk mengirim sinyal aman ke otakmu.",
      content: `Ketika kita merasa cemas, tubuh kita secara otomatis mengaktifkan mode siaga. Jantung berdetak lebih cepat, napas menjadi dangkal, dan otot-otot menegang. Kondisi ini sering kali membuat kita semakin panik karena merasa kehilangan kendali atas tubuh sendiri.

Kunci utama untuk mematikan alarm kepanikan ini ada pada napasmu. Saat kamu memperlambat dan memperdalam napas, kamu mengirimkan sinyal fisik ke otak bahwa situasi saat ini sebenarnya aman. Sinyal inilah yang akan menurunkan detak jantung secara instan.

Mari kita coba teknik napas secara santai:
Embuskan napas sepenuhnya lewat mulut sampai terdengar suara mendesah pelan. Kemudian tutup mulutmu, lalu hirup napas perlahan lewat hidung sambil berhitung satu sampai empat dalam hati. Rasakan udara segar mengisi perutmu secara mendalam.

Setelah itu, tahan napasmu dan hitung dari satu sampai tujuh dalam hati. Jangan menahan dengan tegang; rilekskan bahu dan otot lehermu. Terakhir, embuskan napas kembali secara perlahan lewat mulut dengan suara mendesah lembut selama delapan detik penuh.

Cobalah lakukan siklus ini sebanyak empat kali. Kamu akan merasakan sensasi hangat dan ketenangan yang perlahan mengalir kembali ke seluruh tubuhmu.`
    },
    {
      title: "Menghadapi Deadline Tanpa Harus Mengorbankan Kewarasan",
      category: "Manajemen Stres",
      time: "6 menit baca",
      icon: "⏰",
      color: "bg-red-50 text-red-700 border-red-100",
      intro: "Pekerjaan menumpuk dan deadline sudah di depan mata? Jangan panik dulu. Yuk, simak cara menyelesaikannya secara bertahap tanpa perlu burnout.",
      content: `Deadline yang mendekat sering kali menjadi pemicu stres nomor satu bagi banyak dari kita. Lucunya, saat stres memuncak, kita justru cenderung menunda-nunda pekerjaan atau mengalami prokrastinasi karena otak merasa terbebani melihat tumpukan tugas yang begitu besar. Ini adalah lingkaran setan yang melelahkan.

Untuk memutus siklus ini, kita perlu mengubah cara kita memandang tugas tersebut. Alih-alih melihatnya sebagai satu gunung besar yang harus didaki sekaligus, mari kita pecah menjadi bukit-bukit kecil yang lebih mudah dilewati.

Berikut tips praktis dari meja konselor untukmu:
Cobalah aturan lima menit. Jika kamu sangat malas memulai, katakan pada dirimu sendiri bahwa kamu hanya akan mengerjakan tugas itu selama lima menit saja. Setelah waktu berlalu, kamu bebas untuk berhenti. Faktanya, langkah tersulit adalah memulai. Begitu kamu sudah berjalan selama lima menit, biasanya otak akan lebih mudah untuk melanjutkan.

Selain itu, singkirkan gangguan visual. Bersihkan mejamu dari barang-barang yang tidak diperlukan. Ponsel yang menyala di dekatmu adalah musuh utama fokus. Letakkan ponsel di ruangan lain atau gunakan mode senyap selama kamu bekerja.

Beri pula dirimu jeda. Bekerja tanpa henti justru akan merusak kualitas hasil pekerjaanmu. Berikan jeda istirahat lima menit setiap kali selesai bekerja selama dua puluh lima menit. Gunakan jeda ini untuk minum air atau melihat pemandangan di luar jendela.`
    },
    {
      title: "Menumpahkan Emosi Lewat Tulisan: Terapi Jurnal saat Sedih",
      category: "Kesehatan Mental",
      time: "5 menit baca",
      icon: "✍️",
      color: "bg-indigo-50 text-indigo-700 border-indigo-100",
      intro: "Terkadang, kesedihan terasa terlalu berat untuk diucapkan. Menuliskannya tanpa sensor bisa menjadi cara terbaik untuk merilis beban di dada.",
      content: `Ada hari-hari di mana kesedihan datang seperti kabut tebal, membuat segalanya terasa abu-abu dan berat. Di saat seperti ini, orang-orang di sekitar kita sering kali berkata untuk bercerita. Namun kenyataannya, terkadang kita sendiri tidak tahu apa yang sedang kita rasakan. Kita hanya merasa ingin menangis atau diam saja.

Jika berbicara terasa terlalu melelahkan, cobalah menulis. Menulis jurnal emosional atau yang sering disebut expressive writing adalah cara yang sangat aman untuk menuangkan apa saja yang berkecamuk di dalam dadamu tanpa takut dihakimi oleh siapa pun.

Bagaimana cara memulainya secara alami?
Tulis tanpa aturan. Cari kertas kosong atau buka fitur catatan privat. Tuliskan apa saja yang melintas di pikiranmu. Jangan khawatir tentang tanda baca, ejaan yang salah, atau kalimat yang tidak runtut. Tidak ada orang lain yang akan membaca tulisan ini selain dirimu sendiri.

Ekspresikan segalanya secara jujur. Jika kamu merasa marah, kecewa, atau terluka, tuliskan semuanya. Katakan hal-hal yang tidak bisa kamu ucapkan langsung kepada orang lain di atas kertas tersebut.

Proses menulis ini membantu memindahkan emosi yang abstrak dan berantakan dari dalam kepalamu menjadi bentuk kata-kata yang nyata. Begitu kamu melihat tulisan tersebut, otakmu akan lebih mudah memproses kesedihan itu dan perlahan melepaskannya.`
    },
    {
      title: "Sleep Hygiene: Persiapan Pikiran untuk Istirahat Nyenyak",
      category: "Kesehatan Tidur",
      time: "5 menit baca",
      icon: "💤",
      color: "bg-emerald-50 text-emerald-700 border-emerald-100",
      intro: "Tidur bukan sekadar memejamkan mata. Kamar yang nyaman dan ritual sebelum tidur yang tenang adalah kunci kesegaran fisik dan mental esok hari.",
      content: `Banyak dari kita yang menganggap tidur adalah aktivitas otomatis: berbaring, memejamkan mata, dan selesai. Namun, pernahkah kamu tidur selama delapan jam penuh tapi tetap merasa lelah saat bangun pagi? Itu terjadi karena kualitas tidurmu kurang baik.

Tidur yang berkualitas adalah fondasi utama dari kesehatan mental kita. Kurang tidur membuat kita lebih mudah cemas, sensitif, dan sulit berkonsentrasi. Oleh karena itu, kita perlu mempraktikkan ritual tidur yang baik atau sleep hygiene.

Langkah sederhana yang bisa kamu coba malam ini:
Redupkan lampu kamar. Hindari cahaya terang satu jam sebelum tidur. Cahaya redup akan merangsang tubuhmu memproduksi melatonin, yaitu hormon alami yang membuatmu mengantuk.

Matikan layar ponselmu. Pancaran cahaya biru dari layar ponsel menipu otakmu agar mengira hari masih siang. Cobalah untuk menjauhkan ponsel minimal tiga puluh menit sebelum kamu memejamkan mata.

Ciptakan ritual penenang. Kamu bisa mandi air hangat, membaca buku fisik, mendengarkan musik lembut, atau minum segelas teh chamomile hangat sebelum tidur. Ritual ini menjadi sinyal bagi tubuhmu bahwa hari kerja telah usai dan saatnya beristirahat.`
    },
    {
      title: "Membangun Kebiasaan Baru Tanpa Perlu Beban Mental",
      category: "Psikologi Positif",
      time: "4 menit baca",
      icon: "🚶",
      color: "bg-emerald-50 text-emerald-700 border-emerald-100",
      intro: "Ingin mulai berolahraga atau membaca buku setiap hari? Lupakan target besar yang bikin stres, mari mulai dari langkah sekecil mungkin.",
      content: `Setiap awal tahun atau awal bulan, kita sering kali membuat resolusi besar seperti ingin berolahraga satu jam setiap hari atau membaca satu buku dalam seminggu. Namun, setelah beberapa hari berjalan, semangat kita biasanya memudar dan kita kembali ke kebiasaan lama. Mengapa ini sering terjadi?

Alasannya adalah karena perubahan yang terlalu drastis menciptakan beban mental yang besar bagi otak. Otak kita secara alami menyukai kenyamanan dan membenci perubahan yang melelahkan. Jika targetmu terlalu besar, otak akan mencari seribu satu alasan untuk menundanya.

Kuncinya adalah memulai dari langkah sekecil mungkin:
Coba kebiasaan mikro. Alih-alih menargetkan olahraga satu jam, cobalah berkomitmen untuk melakukan push-up dua kali saja sehari atau jalan kaki lima menit. Alih-alih membaca satu bab buku, bacalah cukup satu halaman saja setiap malam.

Kaitkan dengan rutinitas lama. Tempelkan kebiasaan baru ini setelah rutinitas yang sudah pasti kamu lakukan. Misalnya, setelah menyeduh kopi di pagi hari, kamu akan menulis satu kalimat rasa syukur di buku catatan.

Terakhir, rayakan konsistensimu. Melakukan hal kecil secara konsisten jauh lebih baik daripada melakukan hal besar hanya sekali lalu berhenti. Berikan apresiasi kecil pada dirimu setiap kali kamu berhasil menjaga rutinitas mikromu.`
    },
    {
      title: "Seni Berkata 'Tidak': Menjaga Kesehatan Mental dari Rasa Sungkan",
      category: "Asertivitas",
      time: "5 menit baca",
      icon: "🛡️",
      color: "bg-red-50 text-red-700 border-red-100",
      intro: "Apakah kamu sering mengiyakan permintaan orang lain hanya karena merasa tidak enak, padahal energimu sudah habis? Mari belajar menetapkan batasan diri.",
      content: `Apakah kamu tipe orang yang selalu berkata ya saat teman meminta bantuan, meskipun sebenarnya kamu sedang sangat lelah atau memiliki urusan penting sendiri? Menjadi orang yang baik dan suka membantu memang mulia. Namun, jika kamu terus-menerus mengorbankan kebutuhan dirimu demi menyenangkan orang lain, kamu sedang menuju kelelahan mental yang mendalam.

Menolak permintaan orang lain bukan berarti kamu egois atau jahat. Itu adalah bentuk batasan diri atau boundaries yang sehat. Batasan diri membantu menjaga energimu agar tidak habis terkuras untuk hal-hal yang sebenarnya bukan tanggung jawabmu.

Bagaimana cara berkata tidak dengan sopan tanpa merasa bersalah?
Berikan penjelasan singkat. Kamu tidak perlu membuat alasan berbelit-belit yang terkesan mengada-ada. Cukup katakan secara jujur dan sopan, misalnya: terima kasih sudah memercayiku, tapi untuk saat ini jadwalku sedang sangat padat sehingga aku tidak bisa membantumu.

Tawarkan alternatif lain jika memungkinkan. Jika kamu memang ingin membantu tapi tidak bisa saat ini, kamu bisa menawarkan opsi lain: aku tidak bisa mengerjakannya hari ini, tapi bagaimana jika aku bantu periksa besok sore?

Pahami batas kapasitasmu. Ingatlah bahwa kamu tidak bisa membantu orang lain jika dirimu sendiri sedang dalam kondisi rapuh. Menjaga kesehatan mentalmu sendiri adalah prioritas utama sebelum kamu bisa menolong orang lain.`
    },
    {
      title: "Menjadi Teman Terbaik bagi Diri Sendiri (Self-Compassion)",
      category: "Psikologi Positif",
      time: "5 menit baca",
      icon: "💖",
      color: "bg-indigo-50 text-indigo-700 border-indigo-100",
      intro: "Mengapa kita sering kali berbicara sangat kasar pada diri sendiri saat gagal, padahal kita bisa bersikap sangat lembut kepada teman yang mengalami hal serupa?",
      content: `Coba ingat-ingat kembali, apa yang biasanya kamu katakan pada dirimu sendiri saat kamu melakukan kesalahan kecil di tempat kerja atau kuliah? Apakah kalimat kasar seperti mengapa aku sebodoh ini melintas di kepalamu?

Menariknya, jika teman dekatmu datang kepadamu dan menceritakan kesalahan yang sama, kamu pasti tidak akan mengucapkan kalimat kasar tersebut kepadanya. Kamu pasti akan menepuk pundaknya dan berkata hangat bahwa semuanya akan baik-baik saja dan berbuat salah adalah hal yang manusiawi.

Lalu, mengapa kita bersikap begitu keras pada diri sendiri?
Seni menyayangi diri sendiri, atau self-compassion, mengajak kita untuk memperlakukan diri sendiri dengan kelembutan yang sama seperti saat kita memperlakukan teman baik kita.

Tiga langkah praktis untuk melatih kelembutan diri:
Pertama, gunakan kelembutan diri. Alih-alih menghakimi diri sendiri saat gagal, cobalah berbicara dengan lembut. Katakan pada dirimu bahwa ini memang situasi yang sulit, tapi kamu sudah berusaha sebaik mungkin.

Kedua, sadari kemanusiaan bersama. Ingatlah bahwa melakukan kesalahan dan merasakan kekecewaan adalah bagian dari pengalaman hidup setiap manusia. Kamu tidak sendirian; semua orang juga sedang berjuang menghadapi ketidaksempurnaannya masing-masing.

Ketiga, latih kesadaran penuh. Sadari emosi negatifmu tanpa perlu tenggelam atau membesar-besarkannya. Amati rasa sedih atau kecewa itu, akui keberadaannya, dan biarkan ia berlalu secara perlahan dari pikiranmu.`
    },
    {
      title: "Mengenal Burnout dan Kapan Kamu Harus Benar-benar Berhenti",
      category: "Manajemen Stres",
      time: "6 menit baca",
      icon: "🔥",
      color: "bg-red-50 text-red-700 border-red-100",
      intro: "Kelelahan biasa bisa hilang dengan tidur semalaman. Namun, burnout membutuhkan penanganan emosional yang berbeda. Kenali tandanya sedini mungkin.",
      content: `Ketika pekerjaan atau tugas kuliah terus mengalir tanpa henti, ada kalanya tubuh kita mulai memberikan sinyal-sinyal kelelahan. Awalnya mungkin hanya pegal-pegal biasa atau rasa kantuk. Namun, jika dibiarkan, kelelahan fisik ini bisa merembet menjadi kelelahan emosional yang luar biasa, sebuah kondisi yang kita kenal sebagai burnout.

Burnout berbeda dengan kelelahan biasa. Jika kamu kelelahan setelah beraktivitas seharian, tidur nyenyak di malam hari biasanya cukup untuk memulihkan energimu. Namun, jika kamu mengalami burnout, tidur selama sepuluh jam pun tidak akan membuatmu merasa segar di pagi hari. Kamu akan tetap merasa kosong, tidak bersemangat, dan sinis terhadap pekerjaanmu.

Bagaimana cara mengenali dan mengatasinya sebelum terlambat?
Kenali gejala awalnya. Perhatikan jika kamu mulai merasa sangat malas membuka laptop, mudah tersinggung oleh hal-hal kecil, atau merasa pekerjaanmu tidak ada gunanya lagi. Ini adalah tanda bahwa pikiranmu sedang berteriak meminta jeda.

Lakukan detoksifikasi tugas. Jika memungkinkan, delegasikan beberapa tugasmu atau bicarakan dengan atasan/dosen tentang kapasitas kerjamu saat ini. Jangan ragu untuk menetapkan batasan yang jelas antara waktu kerja dan waktu istirahat pribadi.

Jadwalkan waktu istirahat yang tidak bisa diganggu gugat. Buat satu hari dalam seminggu di mana kamu benar-benar terlepas dari urusan pekerjaan atau tugas akademis. Gunakan hari itu untuk melakukan hobi, berjalan-jalan di alam terbuka, atau sekadar bermalas-malasan tanpa rasa bersalah.`
    },
    {
      title: "Kekuatan Penerimaan Diri di Era Media Sosial yang Bising",
      category: "Psikologi Positif",
      time: "5 menit baca",
      icon: "📱",
      color: "bg-indigo-50 text-indigo-700 border-indigo-100",
      intro: "Melihat kehidupan orang lain di layar ponsel sering kali memicu perasaan tertinggal. Mari belajar menavigasi diri di tengah riuhnya dunia digital.",
      content: `Setiap kali kita membuka media sosial, kita disajikan dengan kurasi momen-momen terbaik dari kehidupan orang lain. Ada yang baru saja lulus, mendapatkan pekerjaan impian, bertunangan, atau berlibur ke tempat-tempat yang indah. Di satu sisi kita merasa senang, namun di sisi lain, perasaan tidak cukup baik kerap kali muncul secara diam-diam.

Kita mulai membandingkan proses hidup kita yang berantakan dengan hasil akhir orang lain yang tampak sempurna di layar ponsel. Ingatlah bahwa apa yang kamu lihat di media sosial hanyalah sebuah cuplikan terbaik, bukan realitas kehidupan sehari-hari mereka yang sesungguhnya.

Bagaimana menjaga kedamaian pikiranmu?
Batasi waktu layar atau screen time. Cobalah pasang batas waktu harian untuk aplikasi media sosialmu. Luangkan waktu pagi hari tanpa langsung membuka ponsel agar pikiranmu tidak langsung dibombardir oleh informasi luar.

Praktikkan kurasi konten secara sadar. Jangan ragu untuk menyembunyikan atau berhenti mengikuti akun-akun yang secara konsisten membuatmu merasa kurang percaya diri atau cemas. Ikuti akun-akun yang memberikan edukasi, inspirasi positif, atau humor yang menyehatkan pikiran.

Fokus pada perjalananmu sendiri. Setiap orang memiliki garis waktu hidupnya masing-masing. Keberhasilan orang lain bukanlah indikator kegagalanmu. Bersyukurlah atas kemajuan kecil yang sudah kamu capai hari ini dibandingkan dirimu di masa lalu.`
    },
    {
      title: "Kualitas Hubungan Sosial vs Kuantitas Teman Digital",
      category: "Kesehatan Mental",
      time: "5 menit baca",
      icon: "👥",
      color: "bg-indigo-50 text-indigo-700 border-indigo-100",
      intro: "Memiliki ratusan pengikut di internet tidak menjamin kita bebas dari rasa kesepian. Yuk, pahami pentingnya koneksi nyata yang mendalam.",
      content: `Kita hidup di era di mana kita bisa terhubung dengan ratusan atau bahkan ribuan orang hanya dalam satu ketukan jari. Kita memiliki teman di berbagai platform sosial, saling bertukar reaksi pada foto, dan memberikan komentar singkat. Namun secara paradoks, tingkat kesepian di era modern ini justru tercatat sebagai yang tertinggi dalam sejarah.

Hal ini terjadi karena otak manusia tidak dirancang untuk memproses hubungan sosial dalam jumlah ribuan secara dangkal. Kita membutuhkan koneksi yang mendalam, tatap muka, dan rasa saling percaya yang nyata untuk merasa aman secara emosional.

Langkah untuk membangun koneksi nyata:
Utamakan kualitas daripada kuantitas. Memiliki dua atau tiga sahabat dekat yang benar-benar memahami dan mendukungmu jauh lebih berharga untuk kesehatan mental daripada memiliki ribuan pengikut yang tidak mengenalmu secara personal.

Jadwalkan pertemuan tatap muka secara rutin. Sesekali, ajaklah teman dekatmu untuk minum kopi bersama, makan malam, atau sekadar berjalan-jalan sore tanpa sibuk memegang ponsel masing-masing. Kehadiran fisik memberikan kehangatan yang tidak bisa digantikan oleh teks digital.

Latihlah empati dan pendengaran aktif. Saat temanmu bercerita, cobalah untuk benar-benar mendengarkan tanpa sibuk memikirkan apa tanggapan yang harus kamu berikan berikutnya. Terkadang, kehadiranmu yang fokus mendengarkan sudah lebih dari cukup untuk meringankan bebannya.`
    },
    {
      title: "Menemukan Kedamaian dalam Keheningan Digital",
      category: "Kesehatan Tidur",
      time: "4 menit baca",
      icon: "📴",
      color: "bg-emerald-50 text-emerald-700 border-emerald-100",
      intro: "Kebisingan notifikasi ponsel secara terus-menerus bisa membuat sistem saraf kita kelelahan. Mari coba latihan detoks digital berkala.",
      content: `Setiap hari, kita dikelilingi oleh kebisingan digital yang tiada henti. Notifikasi email pekerjaan, pesan grup yang terus masuk, berita viral, hingga video pendek yang dirancang untuk menarik perhatian kita selama berjam-jam. Tanpa disadari, kebisingan ini membuat sistem saraf kita berada dalam kondisi waspada secara konstan.

Otak kita tidak pernah benar-benar beristirahat karena selalu ada informasi baru yang harus diproses. Akibatnya, kita menjadi mudah lelah, sulit berkonsentrasi, dan mengalami gangguan tidur.

Bagaimana cara menciptakan ruang hening untuk pikiranmu?
Lakukan detoksifikasi digital berkala. Cobalah tetapkan waktu khusus, misalnya setiap hari Minggu sore atau dua jam sebelum tidur, di mana kamu benar-benar mematikan ponsel atau mengaktifkan mode pesawat.

Nikmati keheningan tanpa distraksi. Saat kamu sedang makan, berjalan kaki, atau mengantre, cobalah untuk tidak memegang ponsel. Biarkan pikiranmu melayang bebas, amati lingkungan sekitarmu, atau cukup nikmati keheningan sesaat tanpa merasa harus selalu produktif atau terhibur.

Rasakan manfaat jangka panjangnya. Setelah melakukan detoks digital secara rutin, kamu akan merasakan pikiranmu menjadi lebih jernih, tingkat kecemasan menurun, dan kemampuanmu untuk menikmati momen saat ini akan meningkat secara drastis.`
    }
  ];

  const categories = ["Semua", ...new Set(articles.map(art => art.category))];

  const filteredArticles = articles
    .filter(art => {
      const matchesCategory = selectedCategory === "Semua" || art.category === selectedCategory;
      const matchesSearch = art.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            art.intro.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "title-asc") {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === "title-desc") {
        return b.title.localeCompare(a.title);
      }
      if (sortBy === "time-asc") {
        const timeA = parseInt(a.time) || 0;
        const timeB = parseInt(b.time) || 0;
        return timeA - timeB;
      }
      if (sortBy === "time-desc") {
        const timeA = parseInt(a.time) || 0;
        const timeB = parseInt(b.time) || 0;
        return timeB - timeA;
      }
      return 0;
    });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-100 dark:border-slate-800/80">
        <div className="text-left space-y-1">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-slate-100 tracking-tight flex items-center gap-3">
            <span className="text-4xl select-none">📖</span> Baca Yuk
          </h1>
          <p className="text-sm text-gray-500 dark:text-slate-400 max-w-xl">
            Kumpulan artikel praktis yang ditulis dari hati ke hati untuk membantumu memahami diri sendiri dan menjaga kesehatan mental.
          </p>
        </div>
      </div>

      {/* Filters & Search Controls */}
      <div className="bg-white/60 dark:bg-slate-900/50 backdrop-blur-md p-6 rounded-3xl border border-gray-100 dark:border-slate-800/60 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full sm:max-w-md">
            <span className="absolute inset-y-0 left-4 flex items-center text-gray-400 select-none">🔍</span>
            <input
              type="text"
              placeholder="Cari judul artikel atau kata kunci..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-slate-200 text-sm transition-all placeholder:text-gray-400"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm("")}
                className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                ×
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <label className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap">Urutkan:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-200 dark:border-slate-800 px-4 py-3 rounded-2xl bg-white/80 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-slate-200 text-sm cursor-pointer"
            >
              <option value="default">Rekomendasi</option>
              <option value="title-asc">Judul (A-Z)</option>
              <option value="title-desc">Judul (Z-A)</option>
              <option value="time-asc">Waktu Baca (Tercepat)</option>
              <option value="time-desc">Waktu Baca (Terlama)</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider">Kategori Topik</label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer border ${
                  selectedCategory === cat
                    ? "bg-indigo-600 text-white border-indigo-650 shadow-md shadow-indigo-150/10 dark:shadow-none"
                    : "bg-white dark:bg-slate-900 text-gray-655 dark:text-slate-400 border-gray-200 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800/80 hover:text-gray-900 dark:hover:text-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-slate-950 rounded-3xl border border-gray-100 dark:border-slate-850/80">
          <span className="text-4xl block mb-3">🔍</span>
          <p className="text-sm font-bold text-gray-500 dark:text-slate-400">Tidak ada artikel yang cocok dengan filter atau kata kunci Anda.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {filteredArticles.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-950 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:border-indigo-100"
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-xl border ${item.color}`}>
                    {item.category}
                  </span>
                  <span className="text-xs text-gray-400 dark:text-slate-500 font-medium">
                    ⏰ {item.time}
                  </span>
                </div>

                <div className="flex gap-3 items-start mb-3">
                  <span className="text-3xl select-none">{item.icon}</span>
                  <h2 className="text-lg font-bold text-gray-800 dark:text-slate-200 leading-snug hover:text-indigo-650 transition">
                    {item.title}
                  </h2>
                </div>

                <p className="text-gray-550 dark:text-slate-450 text-sm leading-relaxed mb-6 font-normal">
                  {item.intro}
                </p>
              </div>

              <button
                onClick={() => setSelectedArticle(item)}
                className="w-full bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-indigo-600 dark:text-indigo-400 font-bold py-3 px-4 rounded-xl transition duration-200 cursor-pointer text-center text-sm"
              >
                Baca Selengkapnya
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Article Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-950 rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl border border-gray-100 dark:border-slate-800 relative p-8 transition-colors duration-200">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 text-2xl font-bold bg-gray-100 dark:bg-slate-900 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer"
            >
              ×
            </button>

            {/* Modal Header */}
            <div className="mb-6">
              <span className={`inline-block text-xs font-bold px-3 py-1.5 rounded-xl border mb-3 ${selectedArticle.color}`}>
                {selectedArticle.category}
              </span>
              <h2 className="text-2xl font-extrabold text-gray-900 dark:text-slate-100 leading-snug flex items-center gap-2.5">
                <span className="text-3xl select-none">{selectedArticle.icon}</span>
                {selectedArticle.title}
              </h2>
              <div className="flex gap-4 items-center mt-3 text-xs text-gray-400 dark:text-slate-500 font-medium border-b border-gray-100 dark:border-slate-900 pb-4">
                <span>⏰ Durasi: {selectedArticle.time}</span>
                <span>•</span>
                <span>Topik: Psikologi Terapan</span>
              </div>
            </div>

            {/* Modal Content */}
            <div className="text-gray-650 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-line space-y-4 font-normal">
              {selectedArticle.content}
            </div>

            {/* Modal Footer */}
            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-slate-900 flex justify-end">
              <button
                onClick={() => setSelectedArticle(null)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-6 rounded-xl transition duration-200 cursor-pointer text-sm shadow-md"
              >
                Selesai Membaca
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}