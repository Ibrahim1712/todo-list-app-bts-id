export interface Checklist {
  id: number;
  name: string;
  items?: ChecklistItem[];
  checklistCompletionStatus: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ChecklistItem {
  id: number;
  name: string;
  itemCompletionStatus: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateChecklistRequest {
  name: string;
}

export interface CreateChecklistItemRequest {
  itemName: string;
}

export interface UpdateChecklistItemRequest {
  itemName: string;
}

export interface ChecklistResponse {
  data: Checklist;
}

export interface ChecklistsResponse {
  data: Checklist[];
}

export interface ChecklistItemResponse {
  data: ChecklistItem;
}

export interface ChecklistItemsResponse {
  data: ChecklistItem[];
}
