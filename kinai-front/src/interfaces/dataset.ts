export interface Dataset {
  id: string;
  name: string;
  version: string;
  status: 'ready' | 'processing' | 'error' | 'pending';
  uploadedAt: string;
}

export interface ResultsTableProps {
  datasets: Dataset[];
  onViewDataset: (datasetId: string) => void;
}
