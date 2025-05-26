{{-- resources/views/emails/verifikasi_masukan.blade.php --}}
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Verifikasi Masukan</title>
</head>
<body>
    <h2>Halo {{ $nama }}!</h2>
    <p>Terima kasih telah mengirim feedback ke website Smkn 1 Gedangan.</p>
    <p>Silakan klik tombol di bawah untuk memverifikasi email Anda:</p>
    <a href="{{ $url }}" style="display:inline-block;padding:10px 20px;background:#1d4ed8;color:white;text-decoration:none;border-radius:4px;">Verifikasi Email</a>
    <p>Jika Anda tidak merasa mengirim masukan, abaikan email ini.</p>
</body>
</html>
