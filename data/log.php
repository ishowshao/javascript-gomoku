<?php
/**
 * Created by JetBrains PhpStorm.
 * User: ishowshao
 * Date: 12-9-13
 * Time: 下午8:12
 * To change this template use File | Settings | File Templates.
 */
if (!empty($_POST['log'])) {
    file_put_contents(date('YmdHis') . '.log', $_POST['log']);
}
