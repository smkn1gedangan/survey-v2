<?php

namespace App\Http\Controllers;

use App\Exports\DataSiswaExport;
use App\Models\DataSiswa;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class ExpController extends Controller
{
    public function exportDataSiswa(Request $request)  {
        return Excel::download(new DataSiswaExport($request), 'data-siswa.xlsx');
    }

    public function exportDataSiswaToPdf($id)  {
        $siswa = DataSiswa::with("psb_tahun_ajaran")->findOrFail($id);

        // view PDF dengan data $siswa
        $pdf = Pdf::loadView('pdf.siswa', compact('siswa'));

        return $pdf->download('siswa-' . $siswa->nama_calon_siswa . '.pdf');
    }
    public function exportDataSiswaToPdfAdmin($id)  {
        $siswa = DataSiswa::with("psb_tahun_ajaran")->findOrFail($id);

        // view PDF dengan data $siswa
        $pdf = Pdf::loadView('pdf.siswa_admin', compact('siswa'));

        return $pdf->download('siswa-' . $siswa->nama_calon_siswa . '.pdf');
    }
}
