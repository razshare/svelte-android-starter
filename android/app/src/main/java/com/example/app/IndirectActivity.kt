package com.example.app

import android.util.Log
import com.getcapacitor.BridgeActivity

open class IndirectActivity: BridgeActivity() {
    override fun onStart() {
        super.onStart()
        Log.i("IndirectActivity", "hello world")
    }
}