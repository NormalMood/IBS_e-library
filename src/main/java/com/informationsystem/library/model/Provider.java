package com.informationsystem.library.model;

import java.util.Map;

import static java.util.Map.entry;

public class Provider {

    public static final Map<ProvidersName, Integer> PROVIDERS = Map.ofEntries(
            entry(ProvidersName.IBS, 1),
            entry(ProvidersName.employee, 2)
    );

}
