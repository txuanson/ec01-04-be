export function slugify(title: string): string {
  // Chuyển hết sang chữ thường
  let slug = title.toLowerCase();

  // xóa dấu
  slug = slug.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
  slug = slug.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
  slug = slug.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
  slug = slug.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
  slug = slug.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
  slug = slug.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
  slug = slug.replace(/(đ)/g, 'd');

  // Xóa ký tự đặc biệt
  slug = slug.replace(/([^0-9a-z\s])/g, '');

  // Xóa khoảng trắng thay bằng ký tự -
  slug = slug.replace(/(\s+)/g, '-');
  // xóa phần dự - ở đầu
  slug = slug.replace(/^-+/g, '');
  // xóa phần dư - ở cuối
  slug = slug.replace(/-+$/g, '');

  // return
  return slug;
}
