<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit19750517005ce27864c34e019ae7bb8d
{
    public static $prefixesPsr0 = array (
        'P' => 
        array (
            'Parsedown' => 
            array (
                0 => __DIR__ . '/..' . '/erusev/parsedown',
            ),
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixesPsr0 = ComposerStaticInit19750517005ce27864c34e019ae7bb8d::$prefixesPsr0;
            $loader->classMap = ComposerStaticInit19750517005ce27864c34e019ae7bb8d::$classMap;

        }, null, ClassLoader::class);
    }
}
