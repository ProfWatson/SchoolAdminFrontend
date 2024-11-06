export interface WidgetState {
  id: number;
  widgetName: string;
  width: string;
  height: string;
  widgetPosition: { top: number; left: number };
  originalPosition: { top: number; left: number };
  newPosition: { top: number; left: number };
  isVisible: boolean;
}
