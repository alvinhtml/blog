<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMediasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('medias', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->string('name')->nullable()->comment("文件名");
            $table->string('originalname')->nullable()->comment("原始名");
            $table->integer('type')->index()->comment("类型"); // MIME
            $table->string('path')->nullable()->comment("路径");
            $table->string('preview')->nullable()->comment("预览图");
            $table->string('desp')->default('')->comment("描述");
            $table->text('info')->nullable()->comment("info");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('medias');
    }
}
