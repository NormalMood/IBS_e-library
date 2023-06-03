package com.informationsystem.library.model;

import java.util.Map;

import static java.util.Map.entry;

public class Provider {

    public static final Map<ProvidersName, Short> PROVIDERS = Map.ofEntries(
            entry(ProvidersName.IBS, (short)1),
            entry(ProvidersName.employee, (short)2)
    );

}
