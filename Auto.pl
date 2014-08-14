#!/usr/bin/perl
use strict;
use warnings;

my @command = ('node', 'getrate.js');

while(1){
    my $ret = system @command;
    if ($ret != 0) {
        print "code[$ret]\n";
    }
    sleep(60);
}
