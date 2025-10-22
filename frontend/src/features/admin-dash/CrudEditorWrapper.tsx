import { CircleSpinner } from "@components/ui";
import type { CrudEditorInterface } from "@features/admin-dash/CrudEditorInterface";
import type { EditorMode } from "./AdminCrudPage";

interface Props<T> {
  Editor: React.ComponentType<CrudEditorInterface<T>>;
  objectName: string;
  editorMode: EditorMode;
  editingItem: T | undefined;
  isItemLoading: boolean;
  handleSave: (item: T, isNew: boolean) => void;
  handleDelete: (id: string) => void;
  closeEditor: () => void;
}

export function CrudEditorWrapper<T>({
  Editor,
  objectName,
  editorMode,
  editingItem,
  isItemLoading,
  handleSave,
  handleDelete,
  closeEditor,
}: Props<T>) {
  if (editorMode.type === "idle") return null;

  if (isItemLoading) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30">
        <CircleSpinner text={`Loading ${objectName}...`} />
      </div>
    );
  }

  return (
    <Editor
      open
      item={editingItem ?? null}
      onCreate={(item) => handleSave(item, true)}
      onModify={(item) => handleSave(item, false)}
      onDelete={handleDelete}
      onCancel={closeEditor}
    />
  );
}
