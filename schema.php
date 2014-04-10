<?php
/**
 * Created by JetBrains PhpStorm.
 * User: ishowshao
 * Date: 12-9-5
 * Time: 上午12:55
 */

$source = array(
    //win
    array(
        'data' => array(1, 1, 1, 1, 1),
        'score' => 100001,
        'direction' => 4,
    ),
    //must win
    array(
        'data' => array(0, 1, 1, 1, 1, 0),
        'score' => 10001,
        'direction' => 4,
    ),
    //must care one step
    array(
        'data' => array(0, 1, 1, 1, 0, 1, 0),
        'score' => 3001,
        'direction' => 8,
    ),
    array(
        'data' => array(0, 1, 1, 0, 1, 1, 0),
        'score' => 3001,
        'direction' => 4,
    ),
    array(
        'data' => array(3, 1, 1, 1, 1, 0),
        'score' => 3200,
        'direction' => 8,
    ),
    array(
        'data' => array(3, 1, 1, 1, 0, 1, 0),
        'score' => 3001,
        'direction' => 8,
    ),
    array(
        'data' => array(3, 1, 1, 1, 0, 1, 3),
        'score' => 3001,
        'direction' => 8,
    ),
    array(
        'data' => array(3, 1, 1, 0, 1, 1, 3),
        'score' => 3001,
        'direction' => 4,
    ),
    //must care 2 step
    array(
        'data' => array(0, 1, 1, 1, 0),
        'score' => 1050,
        'direction' => 4,
    ),
    array(
        'data' => array(0, 1, 1, 0, 1, 0),
        'score' => 1001,
        'direction' => 8,
    ),
    //
    array(
        'data' => array(3, 1, 1, 1, 0),
        'score' => 100,
        'direction' => 8,
    ),
    array(
        'data' => array(3, 1, 1, 0, 1, 0),
        'score' => 50,
        'direction' => 8,
    ),
    array(
        'data' => array(0, 1, 1, 0),
        'score' => 10,
        'direction' => 4,
    ),
    array(
        'data' => array(0, 1, 0, 1, 0),
        'score' => 5,
        'direction' => 4,
    ),
    array(
        'data' => array(3, 1, 1, 0),
        'score' => 2,
        'direction' => 8,
    ),
);

class Schema
{
    public static function left($data)
    {
        $result = array();
        $origin = array_search(1, $data);
        foreach ($data as $i => $item) {
            array_push($result, array(0, $i - $origin, $item));
        }
        return $result;
    }

    public static function leftBottom($data)
    {
        $result = array();
        $origin = array_search(1, $data);
        foreach ($data as $i => $item) {
            array_push($result, array($i - $origin, $i - $origin, $item));
        }
        return $result;
    }

    public static function bottom($data)
    {
        $result = array();
        $origin = array_search(1, $data);
        foreach ($data as $i => $item) {
            array_push($result, array($i - $origin, 0, $item));
        }
        return $result;
    }

    public static function rightBottom($data)
    {
        $result = array();
        $origin = array_search(1, $data);
        foreach ($data as $i => $item) {
            array_push($result, array($i - $origin, $origin - $i, $item));
        }
        return $result;
    }

    public static function right($data)
    {
        $result = array();
        $origin = array_search(1, $data);
        foreach ($data as $i => $item) {
            array_push($result, array(0, $origin - $i, $item));
        }
        return $result;
    }

    public static function rightTop($data)
    {
        $result = array();
        $origin = array_search(1, $data);
        foreach ($data as $i => $item) {
            array_push($result, array($origin - $i, $origin - $i, $item));
        }
        return $result;
    }

    public static function top($data)
    {
        $result = array();
        $origin = array_search(1, $data);
        foreach ($data as $i => $item) {
            array_push($result, array($origin - $i, 0, $item));
        }
        return $result;
    }

    public static function leftTop($data)
    {
        $result = array();
        $origin = array_search(1, $data);
        foreach ($data as $i => $item) {
            array_push($result, array($origin - $i, $i - $origin, $item));
        }
        return $result;
    }

    public static function build($source)
    {
        $schemas = array();
        foreach ($source as $schema) {
            array_push($schemas, array('schema' => self::left($schema['data']), 'score' => $schema['score']));
            array_push($schemas, array('schema' => self::leftBottom($schema['data']), 'score' => $schema['score']));
            array_push($schemas, array('schema' => self::bottom($schema['data']), 'score' => $schema['score']));
            array_push($schemas, array('schema' => self::rightBottom($schema['data']), 'score' => $schema['score']));
            if ($schema['direction'] == 8) {
                array_push($schemas, array('schema' => self::right($schema['data']), 'score' => $schema['score']));
                array_push($schemas, array('schema' => self::rightTop($schema['data']), 'score' => $schema['score']));
                array_push($schemas, array('schema' => self::top($schema['data']), 'score' => $schema['score']));
                array_push($schemas, array('schema' => self::leftTop($schema['data']), 'score' => $schema['score']));
            }
        }
        file_put_contents('schemas.js', 'var schemas = ');
        file_put_contents('schemas.js', json_encode($schemas), FILE_APPEND);
        file_put_contents('schemas.js', ';', FILE_APPEND);
    }
}

Schema::build($source);
