<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Masukan extends Model
{
    protected $fillable = ["user_id","masukan"];

    public function user()  {
        return $this->belongsTo(User::class);
    }
}
