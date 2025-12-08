// IWoyouService.aidl
// Interfaz AIDL del servicio de impresión Sunmi V2S
// Si no tienes el AAR, puedes usar este archivo AIDL directamente

package woyou.aidlservice.jiuiv5;

import woyou.aidlservice.jiuiv5.ICallback;

interface IWoyouService {
    void updateFirmware();
    int getFirmwareStatus();
    String getServiceVersion();
    void printerInit(ICallback callback);
    void printerSelfChecking(ICallback callback);
    String getPrinterSerialNo();
    String getPrinterVersion();
    String getPrinterModal();
    int getPrintedLength();
    void lineWrap(int n, ICallback callback);
    void sendRAWData(in byte[] data, ICallback callback);
    void setAlignment(int alignment, ICallback callback);
    void setFontName(String typeface, ICallback callback);
    void setFontSize(float size, ICallback callback);
    void printText(String text, ICallback callback);
    void printTextWithFont(String text, String typeface, float fontsize, ICallback callback);
    void printColumnsText(in String[] colsTextArr, in int[] colsWidthArr, in int[] colsAlign, ICallback callback);
    void printBitmap(in android.graphics.Bitmap bitmap, ICallback callback);
    void printBarCode(String data, int symbology, int height, int width, int textposition, ICallback callback);
    void printQRCode(String data, int modulesize, int errorlevel, ICallback callback);
    void printOriginalText(String text, ICallback callback);
    void commitPrinterBuffer();
    void cutPaper(ICallback callback);
    int getCutPaperTimes();
    void openDrawer(ICallback callback);
    int getDrawerStatus();
    void enterPrinterBuffer(boolean clean);
    void exitPrinterBuffer(boolean commit);
    void tax(in byte[] data, ICallback callback);
    String getPrinterFactory();
    void clearBuffer();
    void commitPrinterBufferWithCallback(ICallback callback);
    void exitPrinterBufferWithCallback(boolean commit, ICallback callback);
    void printColumnsString(in String[] colsTextArr, in int[] colsWidthArr, in int[] colsAlign, ICallback callback);
    int updatePrinterState();
}
