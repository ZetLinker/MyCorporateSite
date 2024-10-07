import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send"; // 送信アイコンをインポート
import CustomEffect from "../util/CustomEffect"; // CustomEffectをインポート
import { getFirestore, collection, addDoc } from "firebase/firestore"; // Firestoreをインポート
import { app } from "../../firebase-config"; // Firebaseアプリのインスタンスをインポート

const initialFormData = {
  name: "",
  company: "",
  tel: "",
  email: "",
  inquiryType: {
    contact: false,
    quotation: false,
    materials: false,
    other: false,
  },
  subject: "",
  message: "",
};

const initialErrors = {
  name: "",
  company: "",
  tel: "",
  email: "",
  inquiryType: "",
  subject: "",
  message: "",
};

const inquiryLabels = {
  contact: "問い合わせ",
  quotation: "見積り依頼",
  materials: "資料請求",
  other: "その他",
};

const Contact: React.FC = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState(initialErrors);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [isMessageFocused, setIsMessageFocused] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const db = getFirestore(app); // Firestoreインスタンスを作成

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      inquiryType: { ...prev.inquiryType, [name]: checked },
    }));
  };

  const validate = () => {
    const newErrors = { ...initialErrors };
    let isValid = true;

    if (!formData.name) {
      newErrors.name = "お名前を入力してください";
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = "メールアドレスを入力してください";
      isValid = false;
    }

    if (!formData.subject) {
      newErrors.subject = "件名を入力してください";
      isValid = false;
    }

    if (!formData.message) {
      newErrors.message = "内容を入力してください";
      isValid = false;
    } else if (formData.message.length > 2000) {
      newErrors.message = "内容は2000文字以内で入力してください";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setErrors(initialErrors);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // チェックボックスが何も選択されていない場合、「お問い合わせ」を選択
    if (!Object.values(formData.inquiryType).some((v) => v)) {
      setFormData((prev) => ({
        ...prev,
        inquiryType: { ...prev.inquiryType, contact: true },
      }));
    }

    if (validate()) {
      setIsSubmitting(true);
      setSubmitSuccess(false);
      setSubmitError(false);
      try {
        // 現在の日時を取得
        const timestamp = new Date();

        // inquiryTypeを文字列に変換
        const inquiryTypeString = Object.keys(formData.inquiryType)
          .filter(
            (key) =>
              formData.inquiryType[key as keyof typeof formData.inquiryType]
          )
          .map((key) => inquiryLabels[key as keyof typeof inquiryLabels])
          .join(", ");

        // Firestoreにフォームデータを送信
        await addDoc(collection(db, "contact"), {
          ...formData,
          inquiryType: inquiryTypeString,
          timestamp,
        });

        // メール送信用APIを呼び出す
        const emailResponse = await fetch(
          "https://asia-northeast1-mycorporatesite-2d46f.cloudfunctions.net/sendEmail",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              data: {
                name: formData.name,
                company: formData.company,
                email: formData.email,
                tel: formData.tel,
                inquiryType: inquiryTypeString,
                subject: formData.subject,
                message: formData.message,
                timestamp: timestamp.toISOString(),
              },
            }),
          }
        );

        if (!emailResponse.ok) {
          throw new Error("メール送信に失敗しました");
        }

        setSubmitSuccess(true);
        setOpenDialog(true);
        resetForm();
      } catch (error) {
        console.error("送信エラー:", error);
        setSubmitError(true);
        setOpenDialog(true); // エラーが発生した場合にもダイアログを表示
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const placeholderText = useMemo(() => {
    const getFutureDate = (monthsToAdd: number) => {
      const currentDate = new Date();
      currentDate.setMonth(currentDate.getMonth() + monthsToAdd);
      return `${currentDate.getFullYear()}年${currentDate.getMonth() + 1}月`;
    };

    if (formData.inquiryType.quotation) {
      return `予算の目安：100,000円～500,000円\n依頼内容：新しいお店のホームページ作成したい\n希望納期：${getFutureDate(
        4
      )}月末\n参考サイト：https://example.com`;
    } else if (formData.inquiryType.materials) {
      return "希望の資料内容：ITサポートの料金プランが知りたい\n興味のあるサービス：ITサポート";
    } else if (formData.inquiryType.other) {
      return "問い合わせ内容：ITツール導入の相談\n質問内容：導入方法について確認したい";
    } else {
      return "問い合わせ内容：ウェブサイトのカスタマイズ\n詳細：メニューを簡単に更新できる機能を追加したい";
    }
  }, [formData.inquiryType]);

  return (
    <Box
      sx={{ width: "100%", minHeight: "100vh", position: "relative", mb: 10 }}
    >
      <Box
        id="wrapper"
        sx={{
          opacity: 1,
          position: "relative",
          overflow: "hidden",
          width: { xs: "80%", sm: "60%" }, // SPで80%、PCで60%の幅を指定
          margin: "0 auto", // 中央寄せ
        }}
      >
        <Box
          component="section"
          sx={{
            textAlign: "center",
            mt: { xs: 10, sm: 15 },
            py: 5,
            borderRadius: "8px",
            position: "relative",
            height: "auto",
            minHeight: "100vh",
          }}
        >
          <CustomEffect>
            <Typography
              variant="h4"
              sx={{
                color: "black",
                fontWeight: "bold",
                mb: 5,
                fontSize: {
                  xs: "10px",
                  sm: "12px",
                  lg: "12px",
                  xl: "12px",
                },
              }}
            >
              CONTACT
            </Typography>
          </CustomEffect>

          <CustomEffect>
            <Typography
              variant="h6"
              sx={{
                textAlign: "center",
                mb: 3,
                fontSize: { xs: "12px", sm: "14px" },
              }}
            >
              お問い合わせありがとうございます。
              <br />
              当社へのご質問やご相談がございましたら、お気軽にお問い合わせください。
              <br />
              担当者が迅速に対応いたします。
            </Typography>
          </CustomEffect>

          <Box
            component="section"
            className="contact_area"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "rgba(0, 0, 0, 0.9)",
                },
                "&.Mui-error fieldset": {
                  borderColor: "rgba(243, 50, 50, 0.8)",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "rgba(0, 0, 0, 0.8)",
              },
              "& .MuiInputLabel-root.Mui-error": {
                color: "rgba(243, 50, 50, 0.8)",
              },
              "& .MuiFormHelperText-root.Mui-error": {
                color: "rgba(243, 50, 50, 0.8)",
              },
              "& .MuiInputBase-input": {
                fontSize: { xs: "14px", sm: "16px" }, // モバイルで14px、PCで16px
              },
            }}
          >
            <Box className="contact_info" sx={{ textAlign: "center" }}>
              <form
                onSubmit={handleSubmit}
                noValidate
                style={{ maxWidth: "600px", margin: "0 auto" }}
              >
                <CustomEffect>
                  <TextField
                    label="お名前"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={!!errors.name}
                    helperText={errors.name}
                    fullWidth
                    margin="normal"
                    required
                    InputLabelProps={{
                      sx: {
                        fontSize: { xs: "12px", sm: "14px" },
                        pt: 0.2,
                      },
                    }}
                  />
                </CustomEffect>

                <CustomEffect>
                  <TextField
                    label="会社名"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    error={!!errors.company}
                    helperText={errors.company}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      sx: {
                        fontSize: { xs: "12px", sm: "14px" },
                        pt: 0.2,
                      },
                    }}
                  />
                </CustomEffect>

                <CustomEffect>
                  <TextField
                    label="TEL"
                    name="tel"
                    value={formData.tel}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      sx: {
                        fontSize: { xs: "12px", sm: "14px" },
                        pt: 0.2,
                      },
                    }}
                  />
                </CustomEffect>

                <CustomEffect>
                  <TextField
                    label="MAIL"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    fullWidth
                    margin="normal"
                    required
                    InputLabelProps={{
                      sx: {
                        fontSize: { xs: "12px", sm: "14px" },
                        pt: 0.2,
                      },
                    }}
                  />
                </CustomEffect>

                <CustomEffect>
                  <FormGroup>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "row", sm: "row" },
                        flexWrap: "wrap",
                        justifyContent: {
                          xs: "space-between",
                          sm: "flex-start",
                        },
                        alignItems: "center",
                      }}
                    >
                      {Object.keys(inquiryLabels).map((type, index) => (
                        <FormControlLabel
                          key={type}
                          control={
                            <Checkbox
                              checked={
                                formData.inquiryType[
                                  type as keyof typeof formData.inquiryType
                                ]
                              }
                              onChange={handleCheckboxChange}
                              name={type}
                            />
                          }
                          label={
                            inquiryLabels[type as keyof typeof inquiryLabels]
                          }
                          componentsProps={{
                            typography: {
                              sx: {
                                fontSize: { xs: "10px", sm: "12px" }, // ここでフォントサイズを設定
                              },
                            },
                          }}
                          sx={{
                            width: { xs: "calc(50% - 8px)", sm: "auto" },
                          }}
                        />
                      ))}
                    </Box>
                    {errors.inquiryType && (
                      <Typography color="error" variant="caption">
                        {errors.inquiryType}
                      </Typography>
                    )}
                  </FormGroup>
                </CustomEffect>

                <CustomEffect>
                  <TextField
                    label="件名"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    error={!!errors.subject}
                    helperText={errors.subject}
                    fullWidth
                    margin="normal"
                    required
                    InputLabelProps={{
                      sx: {
                        fontSize: { xs: "12px", sm: "14px" },
                        pt: 0.2,
                      },
                    }}
                  />
                </CustomEffect>

                <CustomEffect>
                  <Box position="relative">
                    <TextField
                      label="内容"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setIsMessageFocused(true)}
                      onBlur={() => setIsMessageFocused(false)}
                      error={!!errors.message}
                      helperText={errors.message}
                      multiline
                      rows={8}
                      fullWidth
                      margin="normal"
                      required
                      sx={{
                        "& .MuiInputBase-root": {
                          height: "auto",
                          minHeight: "200px",
                        },
                      }}
                      InputLabelProps={{
                        sx: {
                          fontSize: { xs: "12px", sm: "14px" },
                          pt: 0.2,
                        },
                      }}
                    />
                    <Typography
                      variant="body1"
                      sx={{
                        position: "absolute",
                        top:
                          formData.message === "" && !isMessageFocused
                            ? "52px"
                            : "10px",
                        left: "14px",
                        right: "14px",
                        color: errors.message
                          ? "rgba(243, 50, 50, 0.8)"
                          : "text.secondary",
                        pointerEvents: "none",
                        whiteSpace: "pre-line",
                        textAlign: "left",
                        opacity:
                          formData.message === "" && !isMessageFocused ? 1 : 0,
                        transform:
                          formData.message === "" && !isMessageFocused
                            ? "scale(1)"
                            : "scale(0.75)",
                        transformOrigin: "top left",
                        transition: "all 0.2s ease-out",
                        fontSize: { xs: "12px", sm: "14px" },
                        lineHeight: 1.4,
                      }}
                    >
                      {placeholderText}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        position: "absolute",
                        right: 0,
                        bottom: -20,
                        color:
                          formData.message.length > 2000
                            ? "error.main"
                            : "text.secondary",
                      }}
                    >
                      {formData.message.length} / 2000
                    </Typography>
                  </Box>
                </CustomEffect>

                <CustomEffect>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    sx={{
                      width: "240px",
                      height: "45px",
                      mt: 5,
                      mb: 5,
                      borderRadius: "22.5px",
                      textTransform: "none",
                    }}
                    endIcon={<SendIcon />}
                  >
                    <Typography variant="button">
                      {isSubmitting ? "送信中..." : "送信する"}
                    </Typography>
                  </Button>
                </CustomEffect>
              </form>
              <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>送信完了</DialogTitle>
                <DialogContent>
                  <Typography>
                    {submitSuccess
                      ? "お問い合わせありがとうございます。"
                      : "送信に失敗しました。公式LINEからのお問い合わせお願いします。"}
                  </Typography>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => setOpenDialog(false)}
                    sx={{ backgroundColor: "black", color: "white" }}
                  >
                    閉じる
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Contact;
