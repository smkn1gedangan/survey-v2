<!DOCTYPE html>
<html>
<head>
    <title>Data Siswa</title>
    <style>
        body {
            font-family: sans-serif;
            font-size: 14px;
        }
        .row {
            display: flex;
            margin-bottom: 6px;
        }
        .label {
            width: 200px;
            font-weight: bold;
        }
    </style>
</head>
<body>

    <div>
        <h1 style="text-align: center;">SMKN 1 GEDANGAN</h1>
        <div class="row">
            <div class="label">Nama Calon Siswa</div>
            <div>{{ $siswa->nama_calon_siswa }}</div>
        </div>
        <div class="row">
            <div class="label">Tempat, Tanggal Lahir</div>
            <div>
                {{ $siswa->tempat_lahir_calon_siswa }},&nbsp;
                {{ $siswa->tanggal_lahir_calon_siswa }}
            </div>
        </div>
        <div class="row">
            <div class="label">Asal Sekolah</div>
            <div>{{ $siswa->asal_sekolah }}</div>
        </div>
        <div class="row">
            <div class="label">No Telepon</div>
            <div>
                {{ $siswa->telepon_orang_tua_wali }}
            </div>
        </div>
        <div class="row">
            <div class="label">Jurusan</div>
            <div>{{ $siswa->jurusan }}</div>
        </div>
        <div class="row">
            <div class="label">Tanggal Daftar</div>
            <div>{{ \Carbon\Carbon::parse($siswa->created_date)->format('d-m-Y') }}</div>
        </div>
        <div class="row">
            <div class="label">Nama Orang Tua/Wali</div>
            <div>{{ $siswa->nama_orang_tua_wali }}</div>
        </div>
        <div class="row">
            <div class="label">Pekerjaan Orang Tua/Wali</div>
            <div>{{ $siswa->pekerjaan_orang_tua_wali }}</div>
        </div>
        <div class="row">
            <div class="label">Alamat Orang Tua/Wali</div>
            <div>{{ $siswa->alamat_orang_tua_wali ?? '-' }}</div>
        </div>
    </div>

</body>
</html>
