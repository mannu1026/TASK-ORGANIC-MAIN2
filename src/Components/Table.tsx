import { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useDispatch, useSelector } from 'react-redux';
import LoadingScreen from './LoadingScreen';
import { OverlayPanel } from 'primereact/overlaypanel';
import { fetchData } from '../Utility/Data';
import { setTotalPages } from '../store/PageDataSlice';

interface Artwork {
  id: number;
  title: string;
  place_of_origin: string;
  artist_display: string;
  inscriptions: string;
  date_start: number;
  date_end: number;
}

export default function ArtworkTable() {
  const dispatch = useDispatch();

  const [data, setData] = useState<Artwork[]>([]);
  const [limit, setLimit] = useState<number>(0);

  const [selectNo, setSelectNo] = useState<number | null>(null);
  const [globalSelectCount, setGlobalSelectCount] = useState<number>(0);
  const [selectedItems, setSelectedItems] = useState<Artwork[]>([]);
  const currPageNo = useSelector((state: any) => state.pageData.currPageNo);
  const [rowClick, setRowClick] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const overlayRef = useRef<OverlayPanel>(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const result = await fetchData(currPageNo);
        if (!result) return;

        if (result.pagination) {
          setLimit(result.pagination.limit);
          dispatch(setTotalPages(result.pagination.total_pages));
        }

        if (result.data) {
          setData(result.data);

          if (globalSelectCount > 0) {
            const toSelect = Math.min(globalSelectCount, result.data.length);
            const newlySelected = result.data.slice(0, toSelect);
            setSelectedItems((prev) => [...prev, ...newlySelected]);
            setGlobalSelectCount((prev) => prev - toSelect);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [currPageNo]);

  const handleNumberSelect = (value: number | null) => {
    if (!value || value <= 0) return;
    setSelectedItems([]);
    const toSelect = Math.min(value, data.length);
    setSelectedItems(data.slice(0, toSelect));
    setGlobalSelectCount(value - toSelect);
    setSelectNo(value);
    overlayRef.current?.hide();
  };

  if (loading) return <LoadingScreen />;

  const chevron = (
    <div className="flex items-center absolute right-[-50px] z-10 gap-2 justify-center">
      <span
        onClick={(e) => overlayRef.current?.toggle(e)}
        className="px-2 py-1 border rounded-md cursor-pointer hover:bg-gray-200 left-0"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 h"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </span>
    </div>
  );

  return (
    <div className="md:p-4">
      <h2 className="text-lg sm:text-xl font-bold text-center mb-4">Artwork Listing</h2>

      <div className="bg-white px-1 rounded-xl shadow-md md:p-4 overflow-x-auto">
        <div className="min-w-[640px] w-full">
          <DataTable<any>
            value={data}
            scrollable
            scrollHeight="75vh"
            selectionMode={rowClick ? null : 'multiple'}
            selection={rowClick ? undefined : selectedItems}
            onSelectionChange={rowClick ? undefined : (e: any) => setSelectedItems(e.value)}
            dataKey="id"
            tableStyle={{ minWidth: '100%' }}
            className="p-datatable-sm custom-datatable-rows rounded-md"
            stripedRows
          >
            {!rowClick && (
              <Column
                selectionMode="multiple"
                bodyClassName="text-center"
                headerClassName="text-center"
                style={{ width: '3rem' }}
                header={() => (
                  <div className="flex items-center relative justify-end">
                    {chevron}
                  </div>
                )}
              />
            )}

            <Column
              field="title"
              header="Title"
              bodyClassName="align-middle"
              headerClassName="text-center"
              style={{ width: '28%' }}
            />
            <Column
              field="place_of_origin"
              header="Place of Origin"
              bodyClassName="text-center align-middle"
              headerClassName="text-center"
              style={{ width: '10%' }}
            />
            <Column
              field="artist_display"
              header="Artist"
              bodyClassName="text-center align-middle"
              headerClassName="text-center"
              style={{ width: '20%' }}
            />
            <Column
              field="inscriptions"
              header="Inscriptions"
              bodyClassName="text-center align-middle"
              headerClassName="text-center"
              style={{ width: '27%' }}
            />
            <Column
              field="date_start"
              header="Start Date"
              body={(rowData) => <div className="text-center">{rowData.date_start}</div>}
              bodyClassName="text-center align-middle"
              headerClassName="text-center"
              style={{ width: '7%' }}
            />
            <Column
              field="date_end"
              header="End Date"
              body={(rowData) => <div className="text-center">{rowData.date_end}</div>}
              bodyClassName="text-center align-middle"
              headerClassName="text-center"
              style={{ width: '7%' }}
            />
          </DataTable>
        </div>

        <OverlayPanel ref={overlayRef}>
          <div className="p-3 bg-white rounded-lg flex flex-col gap-3 w-full sm:w-60 shadow-md">
            <input
              type="number"
              min={1}
              value={selectNo ?? ''}
              onChange={(e) => setSelectNo(parseInt(e.target.value))}
              className="p-2 border border-gray-300 rounded-md text-sm"
              placeholder="Select number of rows"
            />
            <div className="flex justify-end">
              <button
                onClick={() => handleNumberSelect(selectNo)}
                className="px-3 py-1 sm:px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm transition"
              >
                Submit
              </button>
            </div>
          </div>
        </OverlayPanel>
      </div>
    </div>
  );
}
