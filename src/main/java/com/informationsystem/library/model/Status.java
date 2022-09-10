package com.informationsystem.library.model;

import java.util.Map;
import static java.util.Map.entry;

public class Status {

    public static final Map<StatusName, Integer> STATUSES = Map.ofEntries(
            entry(StatusName.IN_STOCK, 1),
            entry(StatusName.CHECKED_OUT, 2),
            entry(StatusName.TAKEN_OUT, 3),
            entry(StatusName.LOST, 4)
    );

}
