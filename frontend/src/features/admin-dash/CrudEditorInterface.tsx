export interface CrudEditorInterface<T> {
  open?: boolean;
  item: T | null;
  onCreate: (item: T) => void;
  onModify: (item: T & { id: string }) => void;
  onDelete: (id: string) => void;
  onCancel: () => void;
}
