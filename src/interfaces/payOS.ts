export interface CheckoutRequestType {
  orderCode: number;    // Mã đơn hàng
  amount: number;       // Số tiền của đơn hàng
  description: string;  // Mô tả đơn hàng, được sử dụng làm nội dung chuyển khoản
  cancelUrl: string;    // URL của trang web hoặc ứng dụng sẽ được chuyển hướng tới khi khách hàng hủy thanh toán
  returnUrl: string;    // URL của trang web hoặc ứng dụng sẽ được chuyển hướng tới khi khách hàng thanh toán thành công
  signature?: string;   // Chữ ký cho dữ liệu của đơn hàng, có chức năng kiểm tra tính toàn vẹn của dữ liệu
  items?: { name: string; quantity: number; price: number }[];
  buyerName?: string;   // Tên người mua hàng
  buyerEmail?: string;  // Email người mua hàng
  buyerPhone?: string;  // Số điện thoại người mua hàng
  buyerAddress?: string;// Địa chỉ người mua hàng
  expiredAt?: number;   // Thời gian hết hạn của link thanh toán
}

export interface CheckoutResponseType {
  bin: string;            // Mã BIN ngân hàng
  accountNumber: string;  // Số tài khoản của kênh thanh toán
  accountName: string;    // Tên chủ tài khoản của kênh thanh toán
  amount: number;         // Số tiền của đơn hàng
  description: string;    // Mô tả đơn hàng, được sử dụng làm nội dung chuyển khoản
  orderCode: number;      // Mã đơn hàng
  currency: string;       // Đơn vị tiền tệ
  paymentLinkId: string;  // ID link thanh toán
  status: string;         // Trạng thái của link thanh toán
  checkoutUrl: string;    // Đường dẫn trang thanh toán
  qrCode: string;         // Mã QR thanh toán
}

export interface WebhookType {
  orderCode: number;                        // Mã đơn hàng
  amount: number;                           // Số tiền của giao dịch chuyển khoản
  description: string;                      // Mô tả đơn hàng, được dùng làm nội dung chuyển khoản
  accountNumber: string;                    // Số tài khoản của kênh thanh toán
  reference: string;                        // Mã đối ứng của giao dịch chuyển khoản
  transactionDateTime: string;              // Ngày giờ diễn ra giao dịch chuyển khoản
  currency: string;                         // Đơn vị tiền tệ
  paymentLinkId: string;                    // ID link thanh toán
  code: string;                             // Mã lỗi
  desc: string;                             // Mô tả lỗi
  counterAccountBankId?: string | null;     // ID ngân hàng đối ứng
  counterAccountBankName?: string | null;   // Tên ngân hàng đối ứng
  counterAccountName?: string | null;       // Tên chủ tài khoản đối ứng
  counterAccountNumber?: string | null;     // Số tài khoản đối ứng
  virtualAccountName?: string | null;       // Tên chủ tài khoản ảo
  virtualAccountNumber?: string | null;     // Số tài khoản ảo
}